#!/usr/bin/env node

const {
  constants,
  read,
  write
} = require('./lib');


const flip = async (currentPath) => {

  try {

    // Read config file content
    let configContent = await read(currentPath);

    const httpsPathRegex = new RegExp(constants.httpsPath, 'i');
    const sshPathRegex = new RegExp(constants.sshPath, 'i');

    // If it contains httpsPath
    if (httpsPathRegex.test(configContent)) {

      // Replace https url with ssh
      configContent = configContent.replace(constants.httpsPath, constants.sshPath);  
    } else if (sshPathRegex.test(configContent)) {

      // Replace https url with ssh
      configContent = configContent.replace(constants.sshPath, constants.httpsPath);
    } else {

      // If does not contains either ssh/https path
      console.log('Config does not contains remote');
      return;
    }

    // Writting updated config
    await write(currentPath, configContent);

  } catch (err) {

    console.log(err);
  }
}


// Triggering flip with current path
flip(process.cwd());
