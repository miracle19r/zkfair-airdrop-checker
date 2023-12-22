// unset http_proxy; unset https_proxy; unset all_proxy;
const fs = require('fs');
let walletList = []


function mainCheck() {
    const fileName = 'wallets.txt';
    fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) console.log('File read error')
        const lines = data.split('\r\n');
        lines.forEach(line => {
            walletList.push(line)
        })
        walletList.forEach(el => {
            const url = `https://api.zkfair.io/data/api/community-airdrop?address=${el}`
            let objResult = {};
            fetch(url).then(response => {
                return response.json()
            }).then(data => {
                const zkEVM_value = Math.ceil(data.community_airdrop['Polygon zkEVM'].value_decimal - 1)
                const zkRollups_value = Math.ceil(data.community_airdrop.zkRollups.value_decimal - 1)
                objResult.wallet = el
                objResult.zkEVM_amount = zkEVM_value
                objResult.zkRollups_amount = zkRollups_value
                objResult.total_amount = zkEVM_value + zkRollups_value
                console.log(objResult)
            })
        })
    })
}
mainCheck()