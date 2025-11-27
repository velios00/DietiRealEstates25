import axios from "axios";



export async function geoCodeAddress(address, apiKey) {
    const response = await axios.get('https://api.geoapify.com/v1/geocode/search', {
        params: {
            text: address,
            apiKey
        }
    });

    const result = response.data.features[0];
    if (!result) {
        throw new Error("Address not found");
    }

    const props = result.properties;
    const [lon, lat] = result.geometry.coordinates;

    return {
        address: props.formatted,
        city: props.city,
        lat,
        lon
    }

}

export async function getPOIs(lat, lon, apiKey) {
    const response = await axios.get('https://api.geoapify.com/v2/places', {
        params: {
            categories: "commercial,healthcare,public_transport",
            filter: `circle:${lon},${lat},1000`,
            apiKey
        }
    });

    return response.data.features;
}