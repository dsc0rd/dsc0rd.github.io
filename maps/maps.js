mapboxgl.accessToken = 'pk.eyJ1IjoiZHNjMHJkIiwiYSI6ImNtMWR0OGF4bTJsMG4ycXF4ZHZydGl3NXoifQ.UXE3OTPfP4I1wswj3iZSbQ';


const map1 = new mapboxgl.Map({
    container: 'map1',
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/light-v11',
    center: { lng: 71.4306, lat:  51.1283 },
    zoom: 15.4,
    pitch: 64.9,
    bearing: 172.5,
    antialias: true // create the gl context with MSAA antialiasing, so custom layers are antialiased
});

// eslint-disable-next-line no-undef
const tb = (window.tb = new Threebox(
    map1,
    map1.getCanvas().getContext('webgl'),
    {
        defaultLights: true
    }
));

map1.on('style.load', () => {
    map1.addLayer({
        id: 'custom-threebox-model',
        type: 'custom',
        renderingMode: '3d',
        onAdd: function () {
            // Creative Commons License attribution:  Metlife Building model by https://sketchfab.com/NanoRay
            // https://sketchfab.com/3d-models/metlife-building-32d3a4a1810a4d64abb9547bb661f7f3
            const scale = 8;
            const options = {
                obj: './objs/baiterek.gltf',
                type: 'gltf',
                scale: { x: scale, y: scale, z: 8 },
                units: 'meters',
                rotation: { x: 90, y: -90, z: 0 }
            };

            tb.loadObj(options, (model) => {
                model.setCoords([71.43045, 51.128375]);
                model.setRotation({ x: 0, y: 0, z: 241 });
                tb.add(model);
            });
        },

        render: function () {
            tb.update();
        }
    });
});

map1.addControl(new mapboxgl.FullscreenControl());


const mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });


document.querySelector("#geocoderSearch").addEventListener("click", () => {
    
    mapboxClient.geocoding
    .forwardGeocode({
        query: document.querySelector("#geocoderInput").value,
        autocomplete: false,
        limit: 1
    })
    .send()
    .then((response) => {
        if (
            !response ||
            !response.body ||
            !response.body.features ||
            !response.body.features.length
        ) {
            console.error('Invalid response:');
            console.error(response);
            return;
        }
        const feature = response.body.features[0];

        const map2 = new mapboxgl.Map({
            container: 'map2',
            // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
            style: 'mapbox://styles/mapbox/streets-v12',
            center: feature.center,
            zoom: 10
        });

        // Create a marker and add it to the map.
        new mapboxgl.Marker().setLngLat(feature.center).addTo(map2);
    });
});

mapboxClient.geocoding
.forwardGeocode({
    query: 'Astana',
    autocomplete: false,
    limit: 1
})
.send()
.then((response) => {
    if (
        !response ||
        !response.body ||
        !response.body.features ||
        !response.body.features.length
    ) {
        console.error('Invalid response:');
        console.error(response);
        return;
    }
    const feature = response.body.features[0];

    const map2 = new mapboxgl.Map({
        container: 'map2',
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: 'mapbox://styles/mapbox/streets-v12',
        center: feature.center,
        zoom: 10
    });

    // Create a marker and add it to the map.
    new mapboxgl.Marker().setLngLat(feature.center).addTo(map2);
});

