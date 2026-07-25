import { NextResponse } from "next/server";


export async function POST(req: Request) {

  try {

    const { username } = await req.json();


    if (!username) {

      return NextResponse.json(
        {
          error: "Username kosong"
        },
        {
          status: 400
        }
      );

    }



    // Cari User Roblox

    const userResponse = await fetch(
      "https://users.roblox.com/v1/usernames/users",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({

          usernames: [username],

          excludeBannedUsers: true,

        }),

      }
    );



    const userData = await userResponse.json();



    if (!userData.data || userData.data.length === 0) {


      return NextResponse.json({

        found:false,

      });


    }



    const user = userData.data[0];



    // Ambil Avatar

    const avatarResponse = await fetch(

      `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${user.id}&size=150x150&format=Png`

    );


    const avatarData = await avatarResponse.json();



    return NextResponse.json({

      found:true,

      id:user.id,

      username:user.name,

      displayName:user.displayName,

      avatar:
      avatarData.data[0].imageUrl

    });



  } catch(error){


    return NextResponse.json({

      error:"Server error"

    });


  }


}