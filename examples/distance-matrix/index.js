module.exports = function distance(omni, query) {
  let url = 'https://maps.googleapis.com/maps/api/distancematrix/json?key=AIzaSyAuiZisbOWOaO9ZM2zMxWvZDOjKw5joAg8';
  navigator.geolocation.getCurrentPosition(pos => {
    const { latitude, longitude } = pos.coords;
    url += `&origins=${latitude},${longitude}`;
    url += `&destinations=${query.join('+')}`;
    let link = 'https://www.google.com/maps/dir/';
    fetch(url).then(results =>
      results.json()
    ).then(results => {
      const dest = results.destination_addresses[0];
      const src = results.origin_addresses[0];
      const data = results.rows[0].elements[0];
      const meters = data.distance.value;
      const kilometers = (meters / 1000).toFixed(1);
      const miles = (meters * 0.000621371).toFixed(1);
      const duration = data.duration.text;
      link += `${src}/${dest}`;
      console.log(link);
      omni.removeItems();
      omni.addItems({
        title: `${duration} - ${kilometers} km (${miles} mi)`,
        subtitle: dest,
        link,
      });
      omni.sendFeedback();
    });
  });
};
