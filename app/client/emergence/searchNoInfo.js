Template.NoCompanyInfo.events({
  "click #open-noinfomodal": function(event, template){
    event.preventDefault();
    $("#NoInfoModal").modal("show");
  }
});
