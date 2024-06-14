import { Button } from 'flowbite-react'
import React from 'react'

function NotificationItems() {
  return (
    <div>
        <h3 className='text-md py-2'>Request Canceled</h3>
        <p className='text-gray-400 py-2'>Request of the group was canceled please collect back your contribution amount</p>
        <div className='flex items-center pt-2'>
        <button type="button" className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">collect</button>
        </div>
    </div>
  )
}

export default NotificationItems