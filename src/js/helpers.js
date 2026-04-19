const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export async function getJson(url) {
  try {
    const res = await Promise.race([fetch(url), timeout(10)]);
    // console.log(res);
    const data = await res.json();
    // console.log(data);
    if (!res.ok) throw new Error(`${data.message}, (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
}
export async function sendJson(url, uploadData) {
  try {
    const res = await Promise.race([
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(uploadData),
      }),
      timeout(10),
    ]);
    // console.log(res);
    const data = await res.json();
    // console.log(data);
    if (!res.ok) throw new Error(`${data.message}, (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
}
