Tasks = new Mongo.Collection("tasks");
Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
  Template.body.helpers({
    tasks: function() {
      return Tasks.find({}, {sort: {createdAt: -1}});
    }
  });

  Template.body.events({
    "submit .new-task": function(event) {
      event.preventDefault();
      // R�cup�re la valeur de l'�l�ment du formulaire
      var text = event.target.text.value;

      // Insert une t�che dans notre collection
      Tasks.insert({
        text: text,
        createdAt: new Date()
      });
      // La ligne suivante s'occupe de vider l'�l�ment submit
      event.target.text.value = "";
    }
  });

  Template.task.events({
    "click .toggle-checked": function() {
      // D�finit la propri�t� � checked � � l'oppos� de sa valeur actuelle
      Tasks.update(this._id, {
        $set: {checked: ! this.checked}
      });
    },
    "click .delete": function() {
      Tasks.remove(this._id);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // L'ex�cution de code sur le serveur au d�marrage
  });
}
