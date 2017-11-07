var exerciseData = {
	exercises : [
	{
		exerciseId:"shoudlerRaise",
		exerciseName:"Shoulder Raises",
		distraction:"Medium",
		duration:{
			time:"10",
			unit:"minutes"
		},
		type:"Recommended",
		isCustom:false,
		description:["Do 2 sets of 10", "Can multitask with work"],
		equipment:"Weights or dumbells",
		youtubeLink:"https://www.youtube.com/embed/q5sNYB1Q6aM"
	},

	{
		exerciseId:"jumpingJacks",
		exerciseName:"Jumping Jacks",
		distraction:"High",
		duration:{
			time:"15",
			unit:"minutes"
		},	
		type:"Recommended",
		isCustom:false,
		description:["Do 3 sets of 10", "Requires full attention"],
		equipment:"None",
		youtubeLink:"https://www.youtube.com/embed/UpH7rm0cYbM"
	},

	{
		exerciseId:"standing",
		exerciseName:"Standing",
		distraction:"Low",
		duration:{
			time:"1",
			unit:"hours"
		},
		type:"Custom",
		isCustom:true,
		description:["Standing up while working", "Can do this while studying"],
		equipment:"None",
		youtubeLink:""
	}
	]
}

/* Store default exercises into localStorage */ 
localStorage.clear();
localStorage.setItem("exerciseData", JSON.stringify(exerciseData));
