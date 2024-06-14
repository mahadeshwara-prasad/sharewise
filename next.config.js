export default {
  
    future: {
      webpack5: true, // by default, if you customize webpack config, they switch back to version 4. 
        // Looks like backward compatibility approach.
    },
    webpack(config) {
      config.resolve.fallback = {
        ...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
          // by next.js will be dropped. Doesn't make much sense, but how it is
        fs: false, // the solution
        net: false,
          dns: false,
          tls: false,
          assert: false,
          // fixes sentry dependencies
          process: false,
      };
  
      return config;
    },
    
  };