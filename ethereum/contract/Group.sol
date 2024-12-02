// SPDX-License-Identifier: MIT
pragma solidity  ^0.8.20;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Factory{
    address[] public deployedGroup;
    struct GroupDetail{
        address groupAddress;
        address groupOwner;
        string groupName;
        string image;
        uint date;
    }
    mapping (address=>GroupDetail) public groupDetails;

    function createGroup(string memory name, string memory description, string memory image) public {
        address newGroup = address(new Group(msg.sender,name,description,image));
        deployedGroup.push(newGroup);
        GroupDetail storage newGroupDetail = groupDetails[newGroup];
        newGroupDetail.groupAddress=newGroup;
        newGroupDetail.groupName=name;
        newGroupDetail.groupOwner=msg.sender;
        newGroupDetail.image=image;
        newGroupDetail.date = block.timestamp;
    }

    function getFriends(address groupAddress) public view returns (bool){
        Group group = Group(groupAddress);
        return (group.checkFriend(msg.sender));
    }

    function updateGroupDetails(address groupAddress,string memory name, string memory description, string memory image) public {
        Group group = Group(groupAddress);
        groupDetails[groupAddress].groupName=name;
        groupDetails[groupAddress].image=image;
        group.editGroupDetails(name, description, image, msg.sender);
    }
    
    function getDeployedGroupAddress() public view returns (address[] memory){
        return deployedGroup;
    }    

}

contract Group{

    address public groupOwner;
    string public groupName;
    string public groupDescription;
    string public imageUrl;
    mapping (address=>bool) public admin;
    mapping (address=>bool) public friends;
    mapping (address=>bool) public friendReqCheck;
    uint public friendsCount;
    address[] public friendsList;
    struct FriendRequest{
        address friend;
        bool approved;
        bool rejected;
        uint sentDate;
    }
    FriendRequest[] private friendRequest;
    struct Request{
        string name;
        string description;
        address creator;
        uint date;
        uint endDate;
        uint amount;
        uint minContribution;
        address recipient;
        uint amountReceived;
        address[] approversList;
        mapping (address=>uint) approvers;
        uint approversCount;
        bool completed;
        bool canceled;
    }

    Request[] private request;

    ERC20 public token;

    constructor(address owner, string memory name, string memory description,string memory image){
        groupOwner=owner;
        groupName=name;
        groupDescription=description;
        imageUrl=image;
        token = ERC20(0x758D9c126Ad591ad6FEFC1826cf05Cb88Bcd5684);
        friends[owner]=true;
        admin[owner]=true;
        friendReqCheck[owner]=true;
        friendsList.push(owner);
        friendsCount++;
    }

    function sendFriendRequest() public {
        require(friendReqCheck[msg.sender]==false,"Friend request already sent");
        require(friends[msg.sender]==false,"You are already this group member");
        FriendRequest storage newFriend = friendRequest.push();
        newFriend.friend=msg.sender;
        newFriend.approved=false;
        newFriend.rejected=false;
        newFriend.sentDate=block.timestamp;
        friendReqCheck[msg.sender]=true;
    }

    function acceptRequest(uint index) public adminOnly {
        require(friends[friendRequest[index].friend]==false,"User is already this group member");
        friendRequest[index].approved = true; 
        address friend = friendRequest[index].friend;
        friends[friend]=true;
        friendsList.push(friend);
        friendsCount++;
    }

    function rejectRequest(uint index) public adminOnly {
        friendRequest[index].rejected = true;
        friendReqCheck[friendRequest[index].friend]=false;
    }

    function addFriends(address fri) public adminOnly {
        require(friends[fri]==false,"User is already in this group member");
        friends[fri]=true;
        friendsList.push(fri);
    }

    function createRequest(string memory name,string memory description,uint minCont,uint amount,address recipient)
    public friendsOnly {
        Request storage newRequest = request.push();
        newRequest.name=name;
        newRequest.description=description;
        newRequest.minContribution=minCont;
        newRequest.creator=msg.sender;
        newRequest.date=block.timestamp;
        newRequest.amount=amount;
        newRequest.recipient=recipient;
    }

    function approveRequest(uint index,uint tokenAmount) public friendsOnly  {
        require(request[index].completed==false,"Request already finalized");
        require(request[index].canceled==false,"Request has canceled");
        require(tokenAmount>request[index].minContribution,"Contribution amount should be greater than minimum contribution");
        //(bool success,) = address(token).delegatecall(abi.encodeWithSignature("token.transfer(address, uint)",address(this),tokenAmount));
        token.transferFrom(msg.sender, address(this), tokenAmount);
        if(request[index].approvers[msg.sender]==0){
           request[index].approversList.push(msg.sender); 
           request[index].approversCount++; 
        }
        request[index].approvers[msg.sender] += tokenAmount;
        request[index].amountReceived += tokenAmount; 
    }

    function finalizeRequest(uint index) public {
        require(request[index].creator==msg.sender, "Only the creator of this request can finalize");
        require(request[index].canceled==false,"Request has canceled");
        require(request[index].completed==false,"Request already finalized");
        require(request[index].amountReceived>=request[index].amount,"Target amount not reached");
        request[index].endDate = block.timestamp;
        token.transfer(request[index].recipient, request[index].amount);
        //payable (request[index].recipient).transfer(request[index].amount);
        request[index].completed=true;
    }

    function editRequest(uint index,string memory name,string memory description, uint amount, uint minCont) public {
        require(request[index].creator==msg.sender);
        require(request[index].canceled==false,"Request has canceled");
        request[index].name = name;
        request[index].description = description;
        request[index].amount = amount;
        request[index].minContribution = minCont;
    }

    function cancelRequest(uint index) public {
        require(request[index].creator==msg.sender);
        request[index].canceled=true;
    }

    function takeAmount(uint index) public {
        require(request[index].canceled==true,"Request has not canceled");
        uint amount = request[index].approvers[msg.sender];
        require(amount>0,"You have not contributed to this request");
        token.transfer(msg.sender, amount);
    }

    function getDetails() public view returns (address,address[] memory,string memory,string memory,string memory,uint,uint,uint){
        return (groupOwner,friendsList,groupName,groupDescription,imageUrl,friendsCount,friendRequest.length,request.length);
    }

    function getFriendRequest(uint index) public view returns (address,bool,bool,uint){
        FriendRequest storage friendReq = friendRequest[index];
        return (friendReq.friend,friendReq.approved,friendReq.rejected,friendReq.sentDate);
    }

    function getRequest1(uint index) public view returns (string memory,string memory,address,uint,uint,uint){
        Request storage reqDet = request[index];
        return(reqDet.name,reqDet.description,reqDet.creator,reqDet.date,reqDet.endDate,
        reqDet.amount);
    }

    function getRequest2(uint index) public view returns (uint,address,uint,address[] memory,uint,bool,bool) {
        Request storage reqDet = request[index];
        return (reqDet.minContribution,reqDet.recipient,reqDet.amountReceived,
        reqDet.approversList,reqDet.approversCount,reqDet.completed,reqDet.canceled);
    }

    function getApproverAmount(uint index,address approver) public view returns (uint){
        Request storage reqApp = request[index];
        return (reqApp.approvers[approver]);
    }

    function checkFriend(address caller) public view returns (bool){
        bool friend = friends[caller];
        return (friend);
    }

    function removeFriend(address fri) public ownerOnly{
        require(groupOwner!=fri,"Cannot remove Group owner from the Group");
        friendReqCheck[fri]=false;
        friends[fri]=false;
        admin[fri]=false;
    }

    function appointAdmin(address fri) public adminOnly{
        admin[fri]=true;
    }

    function removeAdmin(address fri) public adminOnly{
        require(groupOwner!=fri,"Cannot remove Group owner as Admin");
        admin[fri]=false;
    }

    function leaveGroup() public friendsOnly{
        require(msg.sender!=groupOwner,"Group owner cannot leave");
        friends[msg.sender]=false;
        friendReqCheck[msg.sender]=false;
        admin[msg.sender]=false;
    }

    function editGroupDetails(string memory name,string memory description,string memory image,address caller) public {
        require(admin[caller],"You are not a admin");
        groupName=name;
        groupDescription=description;
        imageUrl=image;
    }

    modifier ownerOnly{
        require(groupOwner==msg.sender, "Your are not the creator of this group");
        _;
    }

    modifier adminOnly{
        require(admin[msg.sender],"You are not a admin");
        _;
    }

    modifier friendsOnly{
        require(friends[msg.sender],"Your are not a friend of this group");
        _;
    }
}