
// let str = 'FUNDS.TRANSFER,KBS.MLOAN/I/PROCESS,MBK/123455/KE0010001,,MB.MEMBER.NO=24529,DEBIT.AMOUNT=20000.0,MLOAN.TYPE=30'
let str = 'ENQUIRY.SELECT,,MBK/123455/KE0010001,KBS.MB.PROC,CUSTOMER.NO:EQ=30469,TRANSACTION.CODE:EQ=BAL'
let strlen = (str.length).toString()


// use padStart() to pad str wit zeroes
console.log(strlen.padStart(4,0))

let paddedStr = strlen.padStart(4,0)
console.log(paddedStr+str)

