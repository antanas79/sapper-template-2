import { _ as _inherits, a as _getPrototypeOf, b as _possibleConstructorReturn, c as _classCallCheck, i as init, d as _assertThisInitialized, e as dispatch_dev, S as SvelteComponentDev, f as element, g as append_dev, s as safe_not_equal, h as space, t as text, q as query_selector_all, j as detach_dev, k as claim_space, l as claim_element, m as children, n as claim_text, o as attr_dev, p as add_location, r as insert_dev, u as _slicedToArray, v as set_data_dev, w as noop, x as validate_store, y as component_subscribe, z as validate_slots, A as ne } from './client.88c6b29b.js';

var svarainiai = "/client/f384b98e694aa762.jpg";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var file = "src/routes/index.svelte";

function add_css() {
  var style = element("style");
  style.id = "svelte-242urc-style";
  style.textContent = "h1.svelte-242urc,figure.svelte-242urc,p.svelte-242urc{text-align:center;margin:0 auto}h1.svelte-242urc{font-size:2em;text-transform:uppercase;font-weight:700;margin:0 0 0.5em 0}figure.svelte-242urc{margin:0 0 1em 0}img.svelte-242urc{width:100%;max-width:400px;margin:0 0 1em 0}p.svelte-242urc{margin:1em auto}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguc3ZlbHRlIiwic291cmNlcyI6WyJpbmRleC5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdD5cbiAgaW1wb3J0IHN2YXJhaW5pYWkgZnJvbSBcImltYWdlcy9zdmFyYWluaWFpMi5qcGdcIjtcbiAgaW1wb3J0IHsgXyB9IGZyb20gXCIuLi9zZXJ2aWNlcy9pMThuXCI7XG48L3NjcmlwdD5cblxuPHN2ZWx0ZTpoZWFkPlxuICA8dGl0bGU+eyRfKCdJbmRleC5UaXRsZScpfTwvdGl0bGU+XG48L3N2ZWx0ZTpoZWFkPlxuXG48aDE+eyRfKCdJbmRleC5IMScpfTwvaDE+XG48cD57JF8oJ0luZGV4LlAxJyl9PC9wPlxuXG5cbjxmaWd1cmU+XG4gIDxpbWcgYWx0PVwieyRfKCdJbmRleC5QMScpfVwiIHNyYz17c3ZhcmFpbmlhaX0gLz5cbjwvZmlndXJlPlxuXG5cbjxzdHlsZT5cbiAgaDEsXG4gIGZpZ3VyZSxcbiAgcCB7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIG1hcmdpbjogMCBhdXRvO1xuICB9XG5cbiAgaDEge1xuICAgIGZvbnQtc2l6ZTogMmVtO1xuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICBtYXJnaW46IDAgMCAwLjVlbSAwO1xuICB9XG5cbiAgZmlndXJlIHtcbiAgICBtYXJnaW46IDAgMCAxZW0gMDtcbiAgfVxuXG4gIGltZyB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgbWF4LXdpZHRoOiA0MDBweDtcbiAgICBtYXJnaW46IDAgMCAxZW0gMDtcbiAgfVxuXG4gIHAge1xuICAgIG1hcmdpbjogMWVtIGF1dG87XG4gIH1cblxuXG48L3N0eWxlPlxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQW1CRSxnQkFBRSxDQUNGLG9CQUFNLENBQ04sQ0FBQyxjQUFDLENBQUMsQUFDRCxVQUFVLENBQUUsTUFBTSxDQUNsQixNQUFNLENBQUUsQ0FBQyxDQUFDLElBQUksQUFDaEIsQ0FBQyxBQUVELEVBQUUsY0FBQyxDQUFDLEFBQ0YsU0FBUyxDQUFFLEdBQUcsQ0FDZCxjQUFjLENBQUUsU0FBUyxDQUN6QixXQUFXLENBQUUsR0FBRyxDQUNoQixNQUFNLENBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxBQUNyQixDQUFDLEFBRUQsTUFBTSxjQUFDLENBQUMsQUFDTixNQUFNLENBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxBQUNuQixDQUFDLEFBRUQsR0FBRyxjQUFDLENBQUMsQUFDSCxLQUFLLENBQUUsSUFBSSxDQUNYLFNBQVMsQ0FBRSxLQUFLLENBQ2hCLE1BQU0sQ0FBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEFBQ25CLENBQUMsQUFFRCxDQUFDLGNBQUMsQ0FBQyxBQUNELE1BQU0sQ0FBRSxHQUFHLENBQUMsSUFBSSxBQUNsQixDQUFDIn0= */";
  append_dev(document.head, style);
}

function create_fragment(ctx) {
  var title_value;
  var t0;
  var h1;
  var t1_value =
  /*$_*/
  ctx[0]("Index.H1") + "";
  var t1;
  var t2;
  var p;
  var t3_value =
  /*$_*/
  ctx[0]("Index.P1") + "";
  var t3;
  var t4;
  var figure;
  var img;
  var img_alt_value;
  var img_src_value;
  document.title = title_value =
  /*$_*/
  ctx[0]("Index.Title");
  var block = {
    c: function create() {
      t0 = space();
      h1 = element("h1");
      t1 = text(t1_value);
      t2 = space();
      p = element("p");
      t3 = text(t3_value);
      t4 = space();
      figure = element("figure");
      img = element("img");
      this.h();
    },
    l: function claim(nodes) {
      var head_nodes = query_selector_all("[data-svelte=\"svelte-uhsy7\"]", document.head);
      head_nodes.forEach(detach_dev);
      t0 = claim_space(nodes);
      h1 = claim_element(nodes, "H1", {
        class: true
      });
      var h1_nodes = children(h1);
      t1 = claim_text(h1_nodes, t1_value);
      h1_nodes.forEach(detach_dev);
      t2 = claim_space(nodes);
      p = claim_element(nodes, "P", {
        class: true
      });
      var p_nodes = children(p);
      t3 = claim_text(p_nodes, t3_value);
      p_nodes.forEach(detach_dev);
      t4 = claim_space(nodes);
      figure = claim_element(nodes, "FIGURE", {
        class: true
      });
      var figure_nodes = children(figure);
      img = claim_element(figure_nodes, "IMG", {
        alt: true,
        src: true,
        class: true
      });
      figure_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(h1, "class", "svelte-242urc");
      add_location(h1, file, 9, 0, 178);
      attr_dev(p, "class", "svelte-242urc");
      add_location(p, file, 10, 0, 204);
      attr_dev(img, "alt", img_alt_value =
      /*$_*/
      ctx[0]("Index.P1"));
      if (img.src !== (img_src_value = svarainiai)) attr_dev(img, "src", img_src_value);
      attr_dev(img, "class", "svelte-242urc");
      add_location(img, file, 14, 2, 241);
      attr_dev(figure, "class", "svelte-242urc");
      add_location(figure, file, 13, 0, 230);
    },
    m: function mount(target, anchor) {
      insert_dev(target, t0, anchor);
      insert_dev(target, h1, anchor);
      append_dev(h1, t1);
      insert_dev(target, t2, anchor);
      insert_dev(target, p, anchor);
      append_dev(p, t3);
      insert_dev(target, t4, anchor);
      insert_dev(target, figure, anchor);
      append_dev(figure, img);
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (dirty &
      /*$_*/
      1 && title_value !== (title_value =
      /*$_*/
      ctx[0]("Index.Title"))) {
        document.title = title_value;
      }

      if (dirty &
      /*$_*/
      1 && t1_value !== (t1_value =
      /*$_*/
      ctx[0]("Index.H1") + "")) set_data_dev(t1, t1_value);
      if (dirty &
      /*$_*/
      1 && t3_value !== (t3_value =
      /*$_*/
      ctx[0]("Index.P1") + "")) set_data_dev(t3, t3_value);

      if (dirty &
      /*$_*/
      1 && img_alt_value !== (img_alt_value =
      /*$_*/
      ctx[0]("Index.P1"))) {
        attr_dev(img, "alt", img_alt_value);
      }
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(t0);
      if (detaching) detach_dev(h1);
      if (detaching) detach_dev(t2);
      if (detaching) detach_dev(p);
      if (detaching) detach_dev(t4);
      if (detaching) detach_dev(figure);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance($$self, $$props, $$invalidate) {
  var $_;
  validate_store(ne, "_");
  component_subscribe($$self, ne, function ($$value) {
    return $$invalidate(0, $_ = $$value);
  });
  var _$$props$$$slots = $$props.$$slots,
      slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots;
      $$props.$$scope;
  validate_slots("Routes", slots, []);
  var writable_props = [];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Routes> was created with unknown prop '".concat(key, "'"));
  });

  $$self.$capture_state = function () {
    return {
      svarainiai: svarainiai,
      _: ne,
      $_: $_
    };
  };

  return [$_];
}

var Routes = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Routes, _SvelteComponentDev);

  var _super = _createSuper(Routes);

  function Routes(options) {
    var _this;

    _classCallCheck(this, Routes);

    _this = _super.call(this, options);
    if (!document.getElementById("svelte-242urc-style")) add_css();
    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Routes",
      options: options,
      id: create_fragment.name
    });
    return _this;
  }

  return Routes;
}(SvelteComponentDev);

export default Routes;
