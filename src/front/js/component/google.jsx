import React from 'react';


function GoogleApiCall() {
    const clientId = 'YOUR_CLIENT_ID_HERE';
    const redirectUri = 'YOUR_REDIRECT_URI_HERE';
    const scope = 'https://www.googleapis.com/auth/gmail.readonly';
  
    // Open the Google OAuth consent screen in a new window
    const consentUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code`;
    const authWindow = window.open(consentUrl, '_blank', 'width=600,height=800');
  
    // Handle the OAuth callback
    window.addEventListener('message', event => {
      if (event.origin !== window.location.origin) {
        return;
      }
  
      // Parse the authorization code from the message
      const code = event.data.code;
  
      // Exchange the authorization code for an access token
      const tokenUrl = 'https://oauth2.googleapis.com/token';
      const data = {
        code: code,
        client_id: clientId,
        client_secret: 'YOUR_CLIENT_SECRET_HERE',
        redirect_uri: redirectUri,
        grant_type: 'authorization_code'
      };
  
      fetch(tokenUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(data)
      })
        .then(response => response.json())
        .then(data => {
          // Use the access token to authenticate the user and register with Gmail
          const accessToken = data.access_token;
          const gmailUrl = 'https://www.googleapis.com/gmail/v1/users/me/profile';
          fetch(gmailUrl, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          })
            .then(response => response.json())
            .then(data => {
                setShow(false);
                Cookies.set('access_token', response.access_token, { expires: 7 });
                navigate('/user');
              console.log(data);
            })
            .catch(error => {
              // Handle errors here
              console.error(error);
            });
        })
    });
  }

  function handleClick(data) {
    navigate('/user');
    console.log('Handling click with data:', data);
  }