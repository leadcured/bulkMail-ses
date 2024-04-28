import ErrorHandler from "../middlewares/error.js";
import dotenv from 'dotenv'
import  AWS   from "aws-sdk";



dotenv.config()




export const newTask = async (req, res, next) => {
  try {
    

    res.status(201).json({
      success: true,
      message: "Task added Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const SES_CONFIG={
  accessKeyId:"AKIA6GBMCYDBME37N6EU",
  secretAccessKey :"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",
  region : "us-east-1"
}

const AWS_SES=new AWS.SES(SES_CONFIG);

// const sendEMail= async(recipientEmail,name)=>{
//   let params={
//     Source:"himanshu.sg0@gmail.com",
//     Destination:{
//       ToAddresses:[
//         recipientEmail
//       ],
    
//     },
//     ReplyToAddresses:[],
//     Message:{
//       Body:{
//         Html:{
//           Charset:'UTF-8',
//           Data:'<h1>this is the body of my email!</h1>',
//         },
//         Text:{
//           Charset:"UTF-8",
//           Data: "This is the body of my email"
//         }
//       },
//       Subject:{
//         Charset:'UTF-8',
//         Data:`Hello,${name}`
//       }
//     },
//   };

//   try{
//     const res=await AWS_SES.sendEmail(params).promise();
//     console.log("email has been sent",res);
//   }catch(error){
//     console.error(error)
//   }
// }


//sendEMail("himdee7@gmail.com","himanshu ji");











const sendBulkEmail = async () => {
  const sheetUrl = "https://sheets.googleapis.com/v4/spreadsheets/1DQoAaP-bH5Sgn4EyeHvfDyD0jJ4fNv7v0drJ3YiOq0g/values/Sheet1!A1:Z?alt=json&key=AIzaSyBVC7H1_uhTvd8DkvlpQoSQWvOXfK2VpC0";
  const messageTags = "a10410510910010110155";
  const configurationSetName = "bulkemail-leadcured";

  try {
    // Fetch data from Google Sheet
    const sheetResponse = await fetch(sheetUrl);
    const sheetData = await sheetResponse.json();

    // Extracting rows from the sheet data
    const rows = sheetData.values.slice(1); // Exclude header row

    // Iterate through each row to send email
    for (const row of rows) {
      const recipientEmail = row[0]; // Assuming the email is in the first column
      const recipientName = row[1]; // Assuming the name is in the second column

      // Generate personalized HTML template
      const htmlTemplate = `
        <h1>Hello, ${recipientName}</h1>
        <p>This is a personalized message for you!</p>
      `;

      // Specify the email parameters
      const params = {
        Source: "himanshu.sg0@gmail.com",
        Destination: {
          ToAddresses: [recipientEmail],
        },
        Message: {
          Body: {
            Html: {
              Charset: "UTF-8",
              Data: htmlTemplate,
            },
          },
          Subject: {
            Charset: "UTF-8",
            Data: `Hello, ${recipientName}`,
          },
        },
        Tags: Object.entries(messageTags).map(([key, value]) => ({ Name: key, Value: value })),
        ConfigurationSetName: configurationSetName,
      };

      // Send the email
      const res = await AWS_SES.sendEmail(params).promise();
      console.log(`Email has been sent to ${recipientEmail}`, res);
    }

    console.log("Bulk emails have been sent successfully!");
  } catch (error) {
    console.error("Error sending bulk emails:", error);
    throw error;
  }
};

// Example usage:
const recipientEmail = "himdee7@gmail.com";
const name = "Recipient Name";
const configurationSetName = "bulkemail-leadcured";

try {
  await sendEmail(recipientEmail, name, configurationSetName);
} catch (error) {
  // Handle the error
  console.error("Failed to send email:", error);
}



