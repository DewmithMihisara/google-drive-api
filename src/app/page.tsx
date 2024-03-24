import Image from "next/image";

export default function Home() {
  const { google }=require('googleapis');
  const CLIENT_ID = '937533774641-cmislbnthip0107uhgn7p6od62s2m3me.apps.googleusercontent.com';
  const CLIENT_SECRET = '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';
  const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
  const REFRESH_TOKEN = '1//047sPh3D8mKVlCgYIARAAGAQSNwF-L9IrgjVlBk2oYBtIBckWz_MUB_7TZL2qXarj1cnTSASDiIwqyfwgfiX44dHbD3eSMhcej_c';

  const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
  );
  const path=require('path')
  const fs=require('fs');

  oauth2Client.setCredentials({
    refresh_token: REFRESH_TOKEN
  });

  const drive=google.drive({
    version: 'v3',
    auth: oauth2Client
  });

  async function uploadFile(){
    try{
      const res=await drive.files.create({
        requestBody: {
          name: 'test.jpg',
          mimeType: 'image/jpg'
        },
        media: {
          mimeType: 'image/jpg',
          body: fs.createReadStream(path.join(__dirname,'test.jpg'))
        }
      });
      console.log(res.data);
    }catch(e){
      console.log(e);
    }
  }

  // uploadFile();

  async function deleteFile(){
    try{
      const res=await drive.files.delete({
        fileId: '1Cri-G5ZSM2h4JB0pMVdzCOtaTNV8pYnC'
      });
      console.log(res.data, res.status);
    }catch(e){
      console.log(e);
    }
  }

  // deleteFile();

  async function genaratePublicURL(){
    try{
      const fieldId ='1qf4-UoiaaF_yC0K9izJEpgLTL-2kr88N';
      await drive.permissions.create({
        fileId: fieldId,
        requestBody:{
          type: 'anyone',
          role: 'reader'
        }
      });
      const res=await drive.files.get({
        fileId:fieldId,
        fields: 'webViewLink, webContentLink'
      });
      console.log(res.data);
    }catch(e){
      console.log(e);
    }
  }

  // genaratePublicURL();

  return (
      <>
        <h1>Home</h1>
      </>
  );
}
