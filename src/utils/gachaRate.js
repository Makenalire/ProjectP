export default function gachaRate(rolls) {
    let items = [];
    for (let i = 0; i < rolls; i++) {
        items.push(weighted_random([{item : {pull:"5 Multiply Score", color:"#FFD700", size:8}, weight: 20}, {item : {pull:"4 Multiply Score", color:"#B24BF3", size:6}, weight: 70}, {item : {pull:"3 Multiply Score", color:"#00FFFF", size:3}, weight: 100}]))
    }
    return items;
}

function weighted_random(options) {
    let i;

    let weights = [options[0].weight];

    for (i = 1; i < options.length; i++)
        weights[i] = options[i].weight + weights[i - 1];

    const random = Math.random() * weights[weights.length - 1];

    for (i = 0; i < weights.length; i++)
        if (weights[i] > random)
            break;

    return options[i].item;
}
