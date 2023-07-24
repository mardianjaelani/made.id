<template>
    <v-container class="mt-8 mb-12">
        <v-row align="center" justify="center" v-if="!localStream">
            <v-col class="col-12" sm="6" md="6">
                <v-card class="elevation-1 rounded-l">
                    <v-card-text>
                        Welcome to my Channel

                        <div class="text-center mb-50">
                            <img height="260px" src="../../assets/channel_join.png">
                        </div>
                    </v-card-text>
                    <v-card-actions>
                        <v-container>
                            <v-row justify="center" align="center">
                                <v-col xs="12" sm="12" md="12" class="col-12">
                                    <v-btn
                                        block
                                        color="secondary"
                                        class="text-white border-12"
                                        @click="joinEvent" 
                                        :disabled="disableJoin"
                                    >
                                    Join Channel
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        <v-row align="center" justify="center" v-if="localStream">
            <v-col class="col-12" sm="10" md="10">
                <v-card>
                    <v-card-text>
                        <v-row>
                            <v-col cols="12">
                                <div class="agora-view">
                                    <div class="agora-video">
                                        <StreamPlayer :stream="localStream" :domId="localStream.getId()" v-if="localStream"></StreamPlayer>
                                    </div>
                                </div>
                            </v-col>
                        </v-row>
                        <v-row justify="center">
                            <v-col cols="8">
                                <div class="text-center" style="height: auto;width: 100%;position: absolute;left: 40px;bottom: 15%;">
                                    <v-btn
                                        class="mx-2"
                                        fab
                                        dark
                                        small
                                        color="grey"
                                    >
                                        <v-icon dark>
                                            mdi-pause
                                        </v-icon>
                                    </v-btn>
                                    <v-btn
                                        class="mx-2"
                                        fab
                                        dark
                                        large
                                        color="error"
                                        @click="[dialog = false, leaveEvent()]"
                                        :disabled="!disableJoin"
                                        ripple
                                    >
                                        <v-icon dark>
                                            mdi-phone-hangup
                                        </v-icon>
                                    </v-btn>
                                    <v-btn
                                        class="mx-2"
                                        fab
                                        dark
                                        small
                                        color="grey"
                                    >
                                        <v-icon dark>
                                            mdi-microphone
                                        </v-icon>
                                    </v-btn>
                                </div>
                            </v-col>
                        </v-row>
                        <v-row>
                            <div v-if="remoteStreams.length > 0">
                                <div style="height: 300px;width: 220px;position: absolute;left: 40px;bottom: 5%;" 
                                    :key="index" v-for="(remoteStream, index) in remoteStreams">
                                    <StreamPlayer :stream="remoteStream" :domId="remoteStream.getId()"></StreamPlayer>
                                </div>
                            </div>
                            <div style="
                            height: 300px;
                            width: 220px;
                            position: absolute;
                            left: 40px;
                            bottom: 5%;"
                            v-else>
                                <v-img src="../../assets/default-user.png" alt="Admin"/>
                            </div>
                            
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script>
import RTCClient from "../../stream/agora";
import StreamPlayer from "../../components/StreamPlayer.vue";
import { log } from '../../stream/utils/utils'
  
export default {
    components: {
        StreamPlayer
    },
    data () {
        return {
            option: {
                appid: '5400c34f559a421797213a7f22fb4d87',
                token: '007eJxTYNBNnu7s9neGROXSpX8XLp55ZX+42OMnNyxX3d+6q+nhrGtPFBhMTQwMko1N0kxNLRNNjAzNLc2NDI0TzdOMjNKSTFIszKe4nU5uCGRk+PDbi5mRAQJBfA6GrOT4kvzs1DwGBgDs5iUB',
                uid: null,
                channel: 'jc_token',
            },
            disableJoin: false,
            localStream: null,
            remoteStreams: [],
        }
    },
    methods: {
        joinEvent () {
            if(!this.option.appid) {
                console.log('Appid');
                return
            }
            if(!this.option.channel) {
                console.log('Channel Name');
                return
            }
            this.rtc.joinChannel(this.option).then(() => {
                console.log('Join Success');
                // this.$message({
                //     message: 'Join Success',
                //     type: 'success'
                // });
                this.rtc.publishStream().then((stream) => {
                    console.log('Publish Success');
                    // this.$message({
                    // message: 'Publish Success',
                    // type: 'success'
                    // });
                    this.localStream = stream
                }).catch((err) => {
                    console.log(err);
                    // this.$message.error('Publish Failure');
                    // log('publish local error', err)
                })
            }).catch((err) => {
                console.log(err);
                // this.$message.error('Join Failure');
                // log('join channel error', err)
            })
            this.disableJoin = true
        },
        leaveEvent () {
            this.disableJoin = false
            this.rtc.leaveChannel().then(() => {
                console.log('Leave Success');
                // this.$message({
                //     message: 'Leave Success',
                //     type: 'success'
                // });
            }).catch((err) => {
                console.log('Leave Failure');
                // this.$message.error('Leave Failure')
                // log('leave error', err)
            })
            this.localStream = null
            this.remoteStreams = []
        },
    },
    created() {
        this.rtc = new RTCClient()
        let rtc = this.rtc
        rtc.on('stream-added', (evt) => {
            let {stream} = evt
            log("[agora] [stream-added] stream-added", stream.getId())
            rtc.client.subscribe(stream)
        })
            
        rtc.on('stream-subscribed', (evt) => {
            let {stream} = evt
            log("[agora] [stream-subscribed] stream-added", stream.getId())
            if (!this.remoteStreams.find((it) => it.getId() === stream.getId())) {
            this.remoteStreams.push(stream)
            }
        })

        rtc.on('stream-removed', (evt) => {
            let {stream} = evt
            log('[agora] [stream-removed] stream-removed', stream.getId())
            this.remoteStreams = this.remoteStreams.filter((it) => it.getId() !== stream.getId())
        }) 

        rtc.on('peer-online', (evt) => {
            this.$message(`Peer ${evt.uid} is online`)
        }) 

        rtc.on('peer-leave', (evt) => {
            this.$message(`Peer ${evt.uid} already leave`)
            this.remoteStreams = this.remoteStreams.filter((it) => it.getId() !== evt.uid)
        }) 
    },
    mounted() {
        this.joinEvent()
    },
}
</script>
  
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.agora-box {

}
.agora-title {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    font-size: 32px;
    font-weight: bold;
    text-align: center;
    color: #2c3e50;
}
.agora-view {
    display: flex;
    flex-wrap: wrap;
}
.agora-video {
    width: 100%;
    height: 600px;
    margin: 20px;
}

.agora-video-list{
    width: 320px;
    height: 180px;
    margin: 20px;
}
.agora-input {
    margin: 20px;
    width: 320px;
}
.agora-text {
    margin: 5px;
    font-size: 16px;
    font-weight: bold;
}
.agora-button {
    display: flex;
    width: 160px;
    justify-content: space-between;
    margin: 20px;
}
</style>