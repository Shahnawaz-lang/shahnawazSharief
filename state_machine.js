Array.prototype.hasOwnElement = function(el){

    let flag = false, array = this; 
    for(let i = 0; i < array.length; i++){
        if(el === array[i]) flag = true;
    }
    return flag;

};

Object.prototype.iterator = function(callback){

    let itrObj = this;
       if(itrObj instanceof String || itrObj instanceof Array){
            for(let index = 0; index < itrObj.length; index++){
              callback(itrObj, index)
            }

       }else if(itrObj instanceof Object){
            for(let key in itrObj){
                callback(key, itrObj);
            }
       }

};

Array.prototype.toObject = function(propval){
	  let newObject = {};
	  	this.forEach((value) => newObject[value] = propval || {});
	  	return newObject;
};




let machine = function(states, acceptState, startState, alphabet){

    this.states = states.toObject();
    this.acceptState = acceptState;
    this.startState = startState; 
    this.currentState = null; 
    this.alphabet = alphabet;

}

machine.prototype.setTransition = function(state, alpha, nextState) {
    if(this.states.hasOwnProperty(state) && this.alphabet.hasOwnElement(alpha)){
            this.states[state][alpha] = nextState;
    }else{
         throw Error("State or alphabet doesn't exist!");
    }
};

machine.prototype.transition = function(state, alpha){
       return this.states[state][alpha];

};

machine.prototype.input = function(string){
	this.currentState = this.startState; // default state 
    string.iterator((itrObj, index) => this.currentState = this.transition(this.currentState, itrObj[index]));
       return this.isMachineInAcceptState() ? "Acceptable String" : "String Rejected";
}

machine.prototype.isMachineInAcceptState = function(){
    return this.currentState === this.acceptState ? true : false;
};

