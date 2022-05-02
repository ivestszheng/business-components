import './nav.less';

export default {
  render() {
    return (
      <div class='custom-nav'>
        {this.$router.options.routes
          .filter((route) => route.component)
          .map(({ path, name }, index, arr) => {
            return (
              <span>
                <router-link to={path}>{name}</router-link>
                &nbsp;{index === arr.length - 1 ? null : '|'}&nbsp;
              </span>
            );
          })}
      </div>
    );
  },
};
