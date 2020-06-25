function rankAttractedTo(){
        function comparedistance(a,b){
          let lat1=mongouser.location[0];
          let lon1=mongouser.location[1];
          let distance1=distance(lat1,lon1,a);
          let distance2=distance(lat1,lon1,b);
          return distance2-distance1;
        }
        function distance(lat1, lon1,user2) {
          let lat2 = user2.location[0];
          let lon2=user2.location[1];
          if ((lat1 == lat2) && (lon1 == lon2)) {
            return 0;
          }
          else {
            var radlat1 = Math.PI * lat1/180;
            var radlat2 = Math.PI * lat2/180;
            var theta = lon1-lon2;
            var radtheta = Math.PI * theta/180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
              dist = 1;
            }
            dist = Math.acos(dist);
            dist = dist * 180/Math.PI;
            dist = dist * 60 * 1.1515;
            return dist;
          }
        }
         