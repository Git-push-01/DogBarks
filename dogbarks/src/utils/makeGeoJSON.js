const makeGeoJSON = (data) => {
  return {
    type: "FeatureCollection",
    features: data.features.map(feature => {
      return {
        'type': "Feature",
        'properties': {
          "id": feature.name,
            "value": feature.value
        },
        'geometry': {
          'type': "Point",
          "coordinates": [feature.long, feature.lat],
        },
      }
    }),
  }
}

export default makeGeoJSON
