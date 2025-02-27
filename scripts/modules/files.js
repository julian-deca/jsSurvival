export default async function readCsv(path){
    const response = await fetch(path).then((response)=>
       response.text().then((text)=>{
        const array = text.split('\n').map(row=>{
            return row.split(",")
        })
        return array
        }))
  return response
  }