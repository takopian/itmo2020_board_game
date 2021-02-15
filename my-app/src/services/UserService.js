
export function hasField(json, key) {
    const value = json[key]
    return value !== undefined && value !== null
}

export function requireField(json, key) {
    if (hasField(json, key)) {
        return json[key]
    }
    throw new Error(`Нет необходимого поля '${key}'`)
}


function parseField(json, field) {
    const value = requireField(json, field)
    return value;
}

export async function getAllPlayers() {
    const response = await fetch('/api/players');
    return await response.json();
}

export async function login(data) {
    const response = await fetch(`/api/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({user: data})
      });
    return await response.json();
}

export async function rollDice() {
    const response = await fetch('/api/random')
    return await response.json();
}

export async function turnInfo() {
    const response = await fetch('/api/turn_info', {
        method: 'GET'
    });
    return await response.json();
}

export async function getCurrentPlayer() {
    const response = await fetch('/api/turn_info', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    });

    return (await response.json())['cur_player'];
}

export async function getIfMyTurn() {
    const response = await fetch('/api/turn_info',{
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    });
    return (await response.json())['my_turn'];
}

export async function finishTurn() {
    const response = await fetch(`/api/finish_turn`,{
               method: 'POST',
               headers: {'Content-Type': 'application/json'},
          })
    return await response.json();
}

export function initiate(fun){
    void fun()
}

export function canFail(failingAction) {
    initiate(async () => {
    try {
        await failingAction()
    } catch (e) {
        console.error(e, e.stack)
    }
})
}