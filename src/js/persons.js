class persons{
    constructor(name, id){
        this.name = name;
        this.id = id;
    }
    getData(){
        return ({
            name:this.name,
            id:this.id
        })
    }
}

module.exports = persons;