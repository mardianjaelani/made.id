import Vue from "vue";
import axios from 'axios';

export const generateToken = (() =>{
    const {RtcTokenBuilder, RtmTokenBuilder, RtcRole, RtmRole} = require('agora-access-token')
    const appId = process.env.VUE_APP_ID;
    const appCertificate = process.env.VUE_APP_SERTIFICATE;
    const channelName = process.env.VUE_CHANNEL_NAME;
    const uid = 0;
    const role = RtcRole.PUBLISHER;
    const expirationTimeInSeconds = 3600
    const currentTimestamp = Math.floor(Date.now() / 1000)
    console.log(currentTimestamp);
    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds
    // Build token with uid
    const tokenA = RtcTokenBuilder.buildTokenWithUid(appId, appCertificate, channelName, uid, role, privilegeExpiredTs);
    console.log("Token with integer number Uid: " + tokenA);

    return {tokenA};
})()