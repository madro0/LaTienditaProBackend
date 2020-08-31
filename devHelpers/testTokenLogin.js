let resp = pm.response.json();

if (resp.ok) {
    let token = resp.token;
    pm.environment.set("token", token);
    console.log('token actualizado');
} else {
    console.log('No se actualizo el token');
}