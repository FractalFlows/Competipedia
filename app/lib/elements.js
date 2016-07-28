
var register_func = function(details, comment, type, title, tid, data, slug){
  console.log('in register_func', details, comment, type, title, tid, data, slug)
  Meteor.call('new_vect',
    targets=[],
    text=details,
    user=Meteor.userId(),
    type=type,
    title=title,
    slug=slug,
    data=data,
    function(err, res){
      // This is a callback to register the second vector using the
      // id of the first vector
      if (err) {
        console.log('error in first new_vect call', err, res)
      } else {
        Meteor.call('new_vect',
          targets=[res, tid],
          text=comment,
          user=Meteor.userId(),
          type='relationship',
          title=`Relationship between #${res} and #${tid}`)
      }
    });
}

var standard_register = function(self, event, template, vect, data=undefined) {
  // Create the two new vectors
    register_func(
      details = event.target.details.value,
      comment = event.target.comment.value,
      type = self.id,
      title = event.target.title.value,
      tid = vect._id,
      data = data,
      slug = slugify(event.target.title.value));
};

Meteor.elements = {
  comment: {
    id: "comment",
    text: "Comment",
    icon: "fa-commenting-o",
  },

  github: {
    id: "github",
    text: "Github",
    icon: "fa-github-square",
    modal: {
      template: "githubModal",
      title: "Integrate with a related github repository",
      register: function(self, event, template, vect) {
        console.log("github", self, event, template, vect);
        let namespace = event.target.namespace.value;
        let repo = event.target.reponame.value;
        register_func(
          details = event.target.details.value,
          comment = event.target.comment.value,
          type = self.id,
          title = `${namespace}/${repo}`,
          tid = vect._id,
          data = {namespace, repo},
          slug = `${namespace}/${repo}`);
        // let userid = Meteor.userId();
        // console.log("github", event, template, comment, user, repo, doi);
        //
        // Meteor.call('new_vect',
        //   targets = [],
        //   text = "",
        //   user = userid,
        //   namespace = event.target.namespace.value,
        //   repo = event.target.reponame.value,
        //   type = "github",
        //   title = event.target.title.value,
        //   slug = slugify(event.target.title),
        //   function(err, res){
        //     // This is a callback to register the second vector using the
        //     // id of the first vector
        //     if (err) {
        //       console.log('error in first new_vect call', err, res)
        //     } else {
        //       Meteor.call('new_vect',
        //         targets = [res, vect._id],
        //         text = event.target.Modalcomment.value,
        //         user = Meteor.userId(),
        //         type = 'relationship',
        //         title = `Relationship between #${res} and #${self.vect._id}`)
        //     }
        //   });
      },
    },
  },

  competitor: {
    id: "competitor",
    text: "New Competitor",
    icon: "fa-code-fork",
    modal: {
      template: "ModalStandard",
      title: "Add new competitor",
      register: standard_register,
    },
  },

  requestnew: {
    id: "requestcompetitor",
    text: "New Competitor",
    icon: "fa-reply",
    modal: {
      template: "ModalRequestComp",
      title: "Request new competitor",
      register: standard_register,
    },
  },

  keyword: {
    id: "keyword",
    text: "New keyword",
    icon: "fa-code-fork",
    modal: {
      template: "ModalKeyword",
      title: "Add new keyword",
      register: standard_register,
    },
  },

  hypothesis: {
    id: "hypothesis",
    text: "Hypothesis",
    icon: "fa-question-circle",
    modal: {
      template: "ModalStandard",
      title: "Add relationship to a hypothesis",
      register: standard_register,
    },
  },


  method: {
    id: "method",
    text: "Method",
    icon: "fa-cog",
    modal: {
      template: "ModalStandard",
      title: "Add relationship to a method",
      register: standard_register,
    },
  },


code:  {
   id: "code",
   text: "Code",
   icon: "fa-code",
   modal: {
     template: "ModalStandard",
     title: "Add relationship to a code",
     register: standard_register,
   },
 },

software:  {
   id: "software",
   text: "Software",
   icon: "fa-question-circle",
   modal: {
     template: "ModalStandard",
     title: "Add relationship to a software",
     register: standard_register,
   },
 },

experiment:  {
   id: "experiment",
   text: "Experiment",
   icon: "fa-cogs",
   modal: {
     template: "ModalStandard",
     title: "Add relationship to an experiment",
     register: standard_register,
   },
 },

observation:  {
   id: "observation",
   text: "Observation",
   icon: "fa-star-o",
   modal: {
     template: "ModalStandard",
     title: "Add relationship to an observation",
     register: standard_register,
   },
 },

result:  {
   id: "result",
   text: "Result",
   icon: "fa-star-o",
   modal: {
     template: "ModalStandard",
     title: "Add relationship to a result",
     register: standard_register,
   },
 },

dataset:  {
   id: "dataset",
   text: "Dataset",
   icon: "fa-database",
   modal: {
     template: "ModalStandard",
     title: "Add relationship to a dataset",
     register: standard_register,
   },
 },

slideshow:  {
   id: "slideshow",
   text: "Slideshow",
   icon: "fa-desktop",
   modal: {
     template: "ModalStandard",
     title: "Add relationship to a slideshow",
     register: standard_register,
   },
 },

video:  {
   id: "video",
   text: "Video",
   icon: "fa-film",
   modal: {
     template: "ModalStandard",
     title: "Add relationship to a video",
     register: standard_register,
   },
 },

reproduction:  {
   id: "reproduction",
   text: "Reproduction",
   icon: "fa-clone",
   modal: {
     template: "ModalStandard",
     title: "Add relationship to a reproduction",
     register: standard_register,
   },
 },

version:  {
   id: "version",
   text: "Version",
   icon: "fa-code-fork",
   modal: {
     template: "ModalStandard",
     title: "Add relationship to a version",
     register: standard_register,
   },
 },

doi:  {
   id: "doi",
   text: "DOI",
   icon: "fa-link",
   modal: {
     template: "ModalStandard",
     title: "Add relationship to a doi",
     register: standard_register,
   },
 },

url:  {
   id: "url",
   text: "URL",
   icon: "fa-link",
   modal: {
     template: "ModalStandard",
     title: "Add relationship to a url",
     register: standard_register,
   },
 },



  model: {
    id: "model",
    text: "Model",
    icon: "fa-question-circle",
    modal: {
      template: "ModalStandard",
      title: "Add relationship to scientific model",
      register: standard_register,
    },
  },

  gitlab: {
    id: "gitlab",
    text: "Gitlab",
    icon: "fa-git",
    // modal: {
    //   template: "githubModal",
    //   base_url: "http://gitlab.com/",
    //   title: "Register a new gitlab repository",
    //   callback: function(event, template){
    //     console.log("gitlab", event, template);
    //   },
    // },
  },

  bitbucket: {
    id: "bitbucket",
    text: "Bitbucket",
    icon: "fa-bitbucket-square",
    // modal: {
    //   template: "githubModal",
    //   base_url: "",
    //   title: "Register a new bitbucket repository",
    //   callback: function(event, template){
    //     console.log("bitbucket", event, template);
    //   },
    // },
  },

  osf: {
    id: "osf",
    text: "Open Science Framework",
    icon: "fa-sun-o",
    // modal: {
    //   template: "SharedWorkspace",
    //   title: "Register a new Open Science Framework workspace",
    //   callback: function(event, template){
    //     console.log("osf", event, template);
    //   },
    // },
  },

  sharepoint: {
    id: "sharepoint",
    text: "Sharepoint",
    icon: "fa-windows",
    // modal: {
    //   template: "SharedWorkspace",
    //   title: "Register a new Sharepoint workspace",
    //   callback: function(event, template){
    //     console.log("sharepoint", event, template);
    //   },
    // },
  },

  dropbox: {
    id: "dropbox",
    text: "Dropbox",
    icon: "fa-dropbox",
    // modal: {
    //   template: "SharedDirectory",
    //   title: "Register a new Dropbox shared directory",
    //   callback: function(event, template){
    //     console.log("dropbox", event, template);
    //   },
    // },
  },

  box: {
    id: "box",
    text: "Box",
    icon: "fa-cube",
    // modal: {
    //   template: "SharedDirectory",
    //   title: "Register a new Box shared directory",
    //   callback: function(event, template){
    //     console.log("box", event, template);
    //   },
    // },
  },

  googledrive: {
    id: "googledrive",
    text: "Google Drive",
    icon: "fa-google",
    // modal: {
    //   template: "SharedDirectory",
    //   title: "Register a new Google Drive shared directory",
    //   callback: function(event, template){
    //     console.log("google", event, template);
    //   },
    // },
  },

  owncloud: {
    id: "owncloud",
    text: "OwnCloud",
    icon: "fa-cloud",
    // modal: {
    //   template: "SharedDirectory",
    //   title: "Register a new OwnCloud shared directory",
    //   callback: function(event, template){
    //     console.log("bitbucket", event, template);
    //   },
    // },
  },

};
