const { AudioPlayerStatus, createAudioPlayer, createAudioResource } = require('@discordjs/voice');



class MusicPlayer {
    constructor() {
        this.queue = [];
        this.currentIndex = 0;
        this.loop = false;
        this.shuffle = false;
        this.audioPlayer = createAudioPlayer();
    }

    add(track) {
        this.queue.push(track);
    }

    play(track) {
        const resource = createAudioResource(track);
        this.audioPlayer.play(resource);
    }

    getIndex(index) {
        return index % this.queue.length;
    }

    currentSong() {
        return this.queue[this.currentIndex];
    }

    skip() {
        if (this.loop) return this.play(currentSong());
        this.currentIndex = getIndex(this.currentIndex + 1)
        this.play(currentSong());
    }

    previous() {
        this.currentIndex = getIndex(this.currentIndex - 1 + this.queue.length);
        this.play(currentSong());
    }

    toggleLoop() {
        this.loop = !this.loop;
    }

    shuffleQueue() {
        for (let i = this.queue.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.queue[i], this.queue[j]] = [this.queue[j], this.queue[i]];
        }
    }

    stop() {
        this.audioPlayer.stop();
        this.queue = [];
        this.currentIndex = 0;
    }

    pause() {
        if (this.audioPlayer.state.status === AudioPlayerStatus.Playing) {
            this.audioPlayer.pause();
            return true;
        }
        return false;
    }

    resume() {
        if (this.audioPlayer.state.status === AudioPlayerStatus.Paused) {
            this.audioPlayer.unpause();
            return true;
        }
        return false;
    }



}

module.exports = MusicPlayer