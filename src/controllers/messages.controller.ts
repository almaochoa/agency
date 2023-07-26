import { RequestHandler } from "express";
const fs = require('fs');

async function fileExist(file:string) {
    try {
        if (fs.existsSync(file)) {
          return true;
        }
      } catch(err) {
        return false;
      }
} 

async function validateFirstLine(line: string){
    let elements = line.split(" ");
    let allValids:boolean = true;

    try {
        elements.forEach(item => {
            if(Number.isNaN(Number.parseInt(item)))
                allValids = false;
        });

        if(allValids){
            if(Number.parseInt(elements[0]) < 2 || Number.parseInt(elements[0]) > 50)
                allValids = false;
            if(Number.parseInt(elements[1]) < 2 || Number.parseInt(elements[1]) > 50)
                allValids = false;
            if(Number.parseInt(elements[2]) < 3 || Number.parseInt(elements[2]) > 5000)
                allValids = false;
        }    

    } catch (err){
        return false;
    }

    return allValids;

}

function validateRegExp(line: string){
 
    const regex = /^([a-zA-Z0-9]+)$/g;
    return regex.test(line);

}
 
function messageFound(msgSearch: string, msgEncrypted: string): boolean {

    let msgExpReg:string = "";
    for(let i=0; i < msgSearch.length; i++){
        msgExpReg += `(${msgSearch[i]}{1,3})`; 
    }
    const regex = new RegExp(msgExpReg);
    return regex.test(msgEncrypted);
}

const getMessage: RequestHandler = async (req, res) => {    

    let file_id = req.params.id;

    let file = `./encmsgs/${file_id}`;
    let exist;
    let lines:string[] = [];
    let msgOneFound = false;
    let msgTwoFound = false;
    let response: string = "";

    try {
        exist = await fileExist(file);
        if(exist){
            const allFileContents = fs.readFileSync(file, 'utf-8');
            if(allFileContents){
                lines = allFileContents.split(/\r?\n/);
                if(lines.length == 4) {
                    await validateFirstLine(lines[0])
                    .then((result:any) => {
                        if(validateRegExp(lines[1]) && validateRegExp(lines[2]) && validateRegExp(lines[3])){
                            msgOneFound = messageFound(lines[1], lines[3]);
                            if(msgOneFound){
                                response = `SI<br/>NO`;    
                            } else {
                                msgTwoFound = messageFound(lines[2], lines[3]);    
                                if(msgTwoFound){
                                    response = `NO<br/>SI`;    
                                } else { //not found any message
                                    response = `NO<br/>NO`;    
                                }
                            }
                            res.status(201).send(response);    
                        }                               
                    })  
                    .catch((error:any) => console.log(error));                    
                } else {
                    console.log('Lines Missing');
                    //res.status(404).json({success:false});
                }    
            } else {
                console.log('File empty');
                //res.status(404).json({success:false});
            }                            
        } else {
            console.log('File not exist');
            //res.status(404).json({success:false});
        }
    } catch(err) {
        //res.status(404).json({success:false});
    }    

}

const getMessages: RequestHandler = async (req, res) => {

    fs.promises.readdir('./encmsgs')
        .then((result:any) => {
            result.forEach((msg:any) => {
                console.log(msg);                
            });
            res.status(201).json({ encrypted_messages: `${result}` });
        })
        .catch((error:any) => console.log(error))     
}

export default {
   getMessage,
   getMessages
}


