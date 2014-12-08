// This code only runs on the client
Meteor.subscribe("tasks");

/******************
 * ****helpers*****
 * ****************/
Template.tasks.helpers({
  tasks: function () {
    if (Session.get("hideCompleted")) {
      // If hide completed is checked, filter tasks
      return Tasks.find({checked: {$ne: true}}, {sort: {createdAt: -1}});
    } else {
      // Otherwise, return all of the tasks
      return Tasks.find({}, {sort: {createdAt: -1}});
    }
  },
  hideCompleted: function () {
    return Session.get("hideCompleted");
  },
  incompleteCount: function () {
    return Tasks.find({checked: {$ne: true}}).count();
  },
  
  isOwner: function () {
    return this.owner === Meteor.userId();
  }
});


/*********************
*******Tasks - events*
**********************/
Template.tasks.events({
  "submit .new-task": function (event) {
    // This function is called when the new task form is submitted
    var text = event.target.text.value;

    Meteor.call("addTask", text);

    // Clear form
    event.target.text.value = "";

    // Prevent default form submit
    return false;
  },
  "change .hide-completed input": function (event) {
    Session.set("hideCompleted", event.target.checked);
  }
});


/*******************************
******Simple Tastk - events ****
********************************/
Template.task.events({
  "click .toggle-checked": function () {
    // Set the checked property to the opposite of its current value
    Meteor.call("setChecked", this._id, ! this.checked);
  },
  "click .delete": function () {
    Meteor.call("deleteTask", this._id);
  },
  "click .toggle-private": function () {
    Meteor.call("setPrivate", this._id, ! this.private);
  }
});






