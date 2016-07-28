var doiRegex = '(10[.][0-9]{4,}(?:[.][0-9]+)*/(?:(?![%"#? ])\\S)+)'
var doiTextPrefix = 'doi\\:'
findoi = function (opts) {
  opts = opts || {}
  return opts.exact ? new RegExp('(?:^' + doiRegex + '$)') :
                      new RegExp('(?:' + doiRegex + ')', 'g')
}

Template.search_competitors.events({
  "submit .search": function(event, template){
    event.preventDefault();
    var text = event.target.search_text.value;
    Router.go(`/emergence/doi/${text}`);
  }
});


// Template.search_competitors.events({
//   "submit .search": function(event, template){
//     event.preventDefault();
//     var text = event.target.search_text.value;
//     // Test if it's a doi using regex
//     if (findoi({exact:true}).test(text)) {
//       console.log('found it', text);
//       Router.go(`/emergence/doi/${text}`);
//     } else {
//       var keys = text.replace(/ /g, '+');
//       Router.go(`/emergence/search/${keys}`);
//     }
//   }
// });


Template.DOI_Integrations.helpers({
   git: [],
});


Template.DOI_Metrics.helpers({
  // n_commits: function() {
  //   let nc = Relationships.find({doi:this.doi, type:"github"})
  //             .map(o => URI.find({user: o.user, repo: o.repo})
  //               .map(o.n_commits))
  //                 .reduce((a,b) => a+b, 0);
  //   return (nc) ? nc : 0
  //   },
    // Old method based on a limited number of events (max 100)
    // return Events.find({doi:this.doi, type:"PushEvent"})  // find pushevents
    //   .map((o) => o.payload.commits.length)               // n commits per event
    //     .reduce((a,b) => a+b, 0)},                        // sum them
  // n_forks: function() {
  //   let forks = Events.find({doi:this.doi, type:"ForkEvent"}).map(()=>1);
  //   return  (!forks.length) ? 0 : forks.length
  // },
  github_stats: function() {
    var git = URI.findOne({doi: this.doi});
    var def = {
      n_forks: 0,
      n_stars: 0,
      n_open_issues: 0,
      n_closed_issues: 0,
      n_subscribers: 0,
      n_commits: 0,
    };
    return (git)? (git.stats)? git.stats.github : def : def},
});


Template.DOI_Integrations.helpers({
  git : function(){

    var repos = Relationships.find({doi: this.doi, type:"github"})
    console.log(repos);
    return repos

    },
  checked: function(){
    let name = "checked_git_repo_"+this.user+'_'+this.repo;
    if (!Session.keys.hasOwnProperty(name)) Session.set(name, true)
    return (Session.get(name))? "checked" : ""
  },
})

Template.DOI_Integrations.onCreated(function(){
  Relationships.find({doi: this.doi, type:"github"}).forEach((o=>{
    Session.set("checked_git_repo_"+o.user+'_'+o.repo, true);
  }));
});

Template.DOI_Integrations.events({
  "click .repo": function(event, template) {
    let name = "checked_git_repo_"+this.user+'_'+this.repo;
    Session.set(name, !Session.get(name));
  }
});
