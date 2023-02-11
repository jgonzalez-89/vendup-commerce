const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			// login: async (email, password) => {
			// 	const opts = {
			// 	  method: "POST",
			// 	  headers: {
			// 		"Content-type": "application/json",
			// 	  },
			// 	  body: JSON.stringify({
			// 		email: email,
			// 		password: password,
			// 	  }),
			// 	};
			// 	try {
			// 	  const resp = await fetch(
			// 		"https://3001-jgonzalez89-subastaecom-7ov78xn03rn.ws-eu86.gitpod.io/api/users",
			// 		opts
			// 	  );
			// 	  if (resp.status !== 200) {
			// 		alert("An error ocurred");
			// 		return false;
			// 	  }
			// 	  const data = await resp.json();
			// 	  localStorage.setItem("token", data.acces_token);
			// 	  setStore({ token: data.acces_token });
			// 	  return true;
			// 	} catch (error) {
			// 	  console.log("There has been an error");
			// 	}
			//   },
		

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
