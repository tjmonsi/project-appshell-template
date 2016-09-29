
      _addToCoreNav: function(navelarr) {
        for (var j in navelarr) {
          var navel = navelarr[j];
          var navelheader = Polymer.dom(navel).cloneNode(true);
          var naveldrawer = Polymer.dom(navel).cloneNode(true);
          
          if (navel.hasAttribute && navel.hasAttribute('navigation')) {
            this.push('navigationElements', navelheader);
            this.push('navigationElements', naveldrawer);
            navelheader.page = this.page;
            naveldrawer.page = this.page;
            naveldrawer.isDrawer = true;
          }
          
          if ((navel.tagName && navel.tagName === 'APP-TOOLBAR')) {
            
            if (navel.hasAttribute && navel.hasAttribute('primary')) {
              var toolelarr = Polymer.dom(navel).getEffectiveChildNodes();
              for (var k in toolelarr) {
                var toolel = toolelarr[k];
                var toolelheader = Polymer.dom(toolel).cloneNode(true);
                var tooleldrawer = Polymer.dom(toolel).cloneNode(true);
                
                if (toolel.hasAttribute && toolel.hasAttribute('navigation')) {
                  this.push('navigationElements', toolelheader);
                  this.push('navigationElements', tooleldrawer);
                  toolelheader.page = this.page;
                  tooleldrawer.page = this.page;
                  tooleldrawer.isDrawer = true;
                }
                
                this.$$('#core-header-toolbar-primary').appendChild(toolelheader);
                
                if (toolel[k].hasAttribute && toolel[k].hasAttribute('main-title')) {
                  this.$$('#core-drawer-toolbar').appendChild(tooleldrawer);
                } else if (toolel[k].hasAttribute && !toolel[k].hasAttribute('not-include-in-drawer')) {
                  this.$$('#core-drawer').appendChild(tooleldrawer);
                }
              }
            } else {
              
              if (navel.hasAttribute && !navel.hasAttribute('not-include-in-drawer')) {
                this.$$('#core-drawer').appendChild(naveldrawer);
              }
              if (navel.hasAttribute && !navel.hasAttribute('not-include-in-header')) {
                this.$$('#core-header').appendChild(navelheader);
              }
            }
          } else {
            if (navel.hasAttribute && navel.hasAttribute('main-title')) {
              this.$$('#core-drawer-toolbar').appendChild(naveldrawer);
            } else if (navel.hasAttribute && !navel.hasAttribute('not-include-in-drawer')) {
              this.$$('#core-drawer').appendChild(naveldrawer);
            }
            if (navel.hasAttribute && !navel.hasAttribute('not-include-in-header')) {
              this.$$('#core-header-toolbar-primary').appendChild(navelheader);
            }
          }
        }
      },
      
      _addToCoreContent: function(pages) {
        var core = this.$$('#core-content');
        for (var j in pages) {
          if (pages[j].getAttribute) {
            Polymer.dom(core).appendChild(pages[j]);  
          }
        }
        var list = core.getEffectiveChildNodes();
        for (var k in list) {
          if (list[k].getAttribute) {
            var name = list[k].getAttribute('name');
            var label = list[k].getAttribute('label');
            if (!list[k].hasAttribute('not-included-in-links')) {
              this.set('navigationObject.' + name, {
                url: name ? '/' + name : '#',
                label: label ? label : 'Link',
                name: name ? name : 'name'
              });  
            }  
          }
          
        }
        var navigationList = [];
        for (var l in this.navigationObject) {
          navigationList.push(this.navigationObject[l]);
        }
        for (var m in this.navigationElements) {
          this.navigationElements[m].navigationList = navigationList;
        }
        
        // render page
        this._routePageChanged(this.page);
        this._pageChanged(this.page);
        core.select(this.page);
      },
      
      // var children = appHeader.getEffectiveChildNodes();

        // for (var i in children) {
        //   var el = children[i];
        //   el.scrollProgress = progress;
        //   el.scrollProgressThreshold = this.scrollProgressThreshold;
        //   var childel = Polymer.dom(el).getEffectiveChildNodes();
        //   for (var j in childel) {
        //     childel[j].scrollProgress = progress;
        //     childel[j].scrollProgressThreshold = this.scrollProgressThreshold;
        //   }
        // }