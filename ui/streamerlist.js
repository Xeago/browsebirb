// Fetch the metadata for a streamer from streamer.json
function getStreamerInfo(streamer) {
  var metadataUrl = streamer.metadata;
  //console.log( "Get metadata " + streamer.metadata);
  $.get(metadataUrl, null, null, "json")
    .done( function(metadata){
      //console.log( "Got metadata " + streamer.metadata);
      if(!metadata) {
        streamer.error = "Failed to get streamer info";
        return;
      }

      streamer.info = metadata;
      streamer.name = metadata['@display_name'] || metadata['@login'];
      streamer.loaded = true;
    } )
    .fail( function(){
      console.log( "No metadata " + streamer.metadata);
      streamer.error = "Metadata not found";
    } )
    .always( function(){
      streamer.loading = false;
    });
}

var streamerlistApp = new Vue({
  el: '#streamerlist',
  data: {
    error: null,
    loading: true,
    streamers: [],
    active: true,
  },
  computed: {
    sortedStreamers: function() {
      return _.sortBy(this.streamers, 'name');
    }
  },
  methods: {
    reload: function(base_url, directories) {
      this.streamers = [];
      var view = this;

      _.forEach(directories, function(dir, index) {
        var url = base_url + dir + '/';

        var streamer = {
          loading: true,
          loaded: false,
          name: "",
          directory: url,
          metadata: url + 'streamer.json'
        };
        view.streamers.push(streamer);

        getStreamerInfo(streamer);
      });
    },

    select: function(streamer) {
      if(streamer.name) {
        navApp.streamer = streamer.name;
        vodlistApp.fetch(streamer);
        this.active = false;
      }
    }
  }
});
