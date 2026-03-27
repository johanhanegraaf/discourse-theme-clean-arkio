import NavigationItem from "discourse/components/navigation-item";
import PluginOutlet from "discourse/components/plugin-outlet";

const NavigationBar = <template>
  {{#each this.navItems as |navItem|}}
    <NavigationItem
      @content={{navItem}}
      @filterMode={{this.filterMode}}
      @category={{this.category}}
      @class={{concat "nav-item_" navItem.name}}
    />
  {{/each}}

  <PluginOutlet
    @name="extra-nav-item"
    @connectorTagName="li"
    @outletArgs={{hash
      category=this.category
      filterMode=this.filterMode
    }}
  />
</template>;

export default NavigationBar;