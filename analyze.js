var waveform = require('waveform-node');
waveformOptions = {
  numOfSample:500,
  waveFormType:'Line'
}

module.exports.analyzeAudio = analyzeAudio = function(release,callback){

  analyzeTracks = function(i,callback){

    // exit loop if done
    if( i == release.tracks.length ){
      callback()
      return
    }

    url = release.tracks[i].url
    waveform.getWaveForm(url,waveformOptions,function(err,peaks){
      if(err){ console.log(err) }
      release.tracks[i].peaks = peaks
      console.log(release.tracks[i].title+' analyzed')
      analyzeTracks(i+1,callback)
    })
  }

  analyzeTracks(0,function(){
    console.log('TRCKS ANALYZED')
    console.log(release.tracks)

    // update the database
    db.releases.findAndModify({
      query:{slug:release.slug},
      update:{$set:{tracks:release.tracks}}
    },function(){
      console.log('DB UPDATED')
      callback()
    })
    
  })

}