
/*
async function getData() {
    const res = await fetch('https://open.assembly.go.kr/portal/openapi/nqbeopthavwwfbekw?KEY=79026accaa3b46d4ae9ec75228ec357d&Type=json', {
        method : 'GET',
        mode : 'cors',
        cache : 'no-cache'
    })
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }

    return res.json();
}
   
export default async function Page() {
    let data = await getData();
    console.log(data.RESULT.CODE);
    return <main></main>;
}
*/
//국회 api 키 
// 79026accaa3b46d4ae9ec75228ec357d