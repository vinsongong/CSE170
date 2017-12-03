var exerciseData = {
	exercises : [
		{
			exerciseId:"shoulderRaise",
			exerciseName:"Shoulder Raises",
			distraction:"Medium",
			canMultiTask:true,
			duration:{
				time:"10",
				unit:"minutes"
			},
			type:"Recommended",
			isCustom:false,
			description:["Do 2 sets of 10"],
			equipment:"Weights or dumbells",
			youtubeLink:"https://www.youtube.com/embed/q5sNYB1Q6aM"
		},
{
			exerciseId:"shrugs",
			exerciseName:"Shrugs",
			distraction:"Medium",
			canMultiTask:true,
			duration:{
				time:"3",
				unit:"minutes"
			},
			type:"Recommended",
			isCustom:false,
			description:["Do 2 sets of 20"],
			equipment:"Dumbells",
			youtubeLink:"https://www.youtube.com/embed/48__FJHeBLk"
		},

		{
			exerciseId:"calfRaises",
			exerciseName:"Calf Raises",
			distraction:"Low",
			canMultiTask:true,
			duration:{
				time:"3",
				unit:"minutes"
			},
			type:"Recommended",
			isCustom:false,
			description:["Do 2 sets of 20"],
			equipment:"(Optional) Structure to hold onto for balance",
			youtubeLink:"https://www.youtube.com/embed/z__UzseazqA"
		},

		{
			exerciseId:"wallSit",
			exerciseName:"Wall Sit",
			distraction:"High",
			canMultiTask:false,
			duration:{
				time:"5",
				unit:"minutes"
			},
			type:"Recommended",
			isCustom:false,
			description:["Do 3 sets of 30 seconds", "Take a minute break in between sets"],
			equipment:"Wall",
			youtubeLink:"https://www.youtube.com/embed/-0Q7Lds7B8A"
		},

		{
			exerciseId:"deskPushUps",
			exerciseName:"Desk Push Ups",
			distraction:"High",
			canMultiTask:false,
			duration:{
				time:"2",
				unit:"minutes"
			},
			type:"Recommended",
			isCustom:false,
			description:["Do 2 sets of 10", "Take a 30 second break between sets"],
			equipment:"Desk",
			youtubeLink:"https://www.youtube.com/embed/vsYtwHnXrPw"
		},

		{
			exerciseId:"jumpingJacks",
			exerciseName:"Jumping Jacks",
			distraction:"High",
			canMultiTask:false,
			duration:{
				time:"15",
				unit:"minutes"
			},
			type:"Recommended",
			isCustom:false,
			description:["Do 3 sets of 10"],
			equipment:"None",
			youtubeLink:"https://www.youtube.com/embed/UpH7rm0cYbM"
		},

		{
			exerciseId:"standing",
			exerciseName:"Standing",
			distraction:"Low",
			canMultiTask:true,
			duration:{
				time:"1",
				unit:"hours"
			},
			type:"Custom",
			isCustom:true,
			description:["Standing up while working"],
			equipment:"None",
			youtubeLink:""
		}
	]
}

var scheduleData = {
	schedules : []
}

/* Store default exercises into localStorage */
localStorage.clear();
localStorage.setItem("exerciseData", JSON.stringify(exerciseData));
localStorage.setItem("scheduleData", JSON.stringify(scheduleData));
