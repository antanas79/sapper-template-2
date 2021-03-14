import { _ as _inherits, a as _getPrototypeOf, b as _possibleConstructorReturn, c as _classCallCheck, i as init, d as _assertThisInitialized, e as dispatch_dev, S as SvelteComponentDev, s as safe_not_equal, h as space, f as element, t as text, q as query_selector_all, j as detach_dev, k as claim_space, l as claim_element, m as children, n as claim_text, p as add_location, o as attr_dev, r as insert_dev, g as append_dev, u as _slicedToArray, v as set_data_dev, w as noop, x as validate_store, y as component_subscribe, z as validate_slots, A as ne } from './client.88c6b29b.js';

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var file = "src/routes/contacts.svelte";

function create_fragment(ctx) {
  var title_value;
  var t0;
  var h1;
  var t1_value =
  /*$_*/
  ctx[0]("Contacts.H1") + "";
  var t1;
  var t2;
  var p0;
  var t3_value =
  /*$_*/
  ctx[0]("Contacts.P1") + "";
  var t3;
  var t4;
  var a0;
  var t5_value =
  /*$_*/
  ctx[0]("footer.phoneToAppear") + "";
  var t5;
  var a0_href_value;
  var t6;
  var p1;
  var t7_value =
  /*$_*/
  ctx[0]("Contacts.P2") + "";
  var t7;
  var t8;
  var a1;
  var t9_value =
  /*$_*/
  ctx[0]("footer.email") + "";
  var t9;
  var a1_href_value;
  document.title = title_value =
  /*$_*/
  ctx[0]("Contacts.Title");
  var block = {
    c: function create() {
      t0 = space();
      h1 = element("h1");
      t1 = text(t1_value);
      t2 = space();
      p0 = element("p");
      t3 = text(t3_value);
      t4 = space();
      a0 = element("a");
      t5 = text(t5_value);
      t6 = space();
      p1 = element("p");
      t7 = text(t7_value);
      t8 = space();
      a1 = element("a");
      t9 = text(t9_value);
      this.h();
    },
    l: function claim(nodes) {
      var head_nodes = query_selector_all("[data-svelte=\"svelte-cx4kik\"]", document.head);
      head_nodes.forEach(detach_dev);
      t0 = claim_space(nodes);
      h1 = claim_element(nodes, "H1", {});
      var h1_nodes = children(h1);
      t1 = claim_text(h1_nodes, t1_value);
      h1_nodes.forEach(detach_dev);
      t2 = claim_space(nodes);
      p0 = claim_element(nodes, "P", {});
      var p0_nodes = children(p0);
      t3 = claim_text(p0_nodes, t3_value);
      t4 = claim_space(p0_nodes);
      a0 = claim_element(p0_nodes, "A", {
        href: true
      });
      var a0_nodes = children(a0);
      t5 = claim_text(a0_nodes, t5_value);
      a0_nodes.forEach(detach_dev);
      p0_nodes.forEach(detach_dev);
      t6 = claim_space(nodes);
      p1 = claim_element(nodes, "P", {});
      var p1_nodes = children(p1);
      t7 = claim_text(p1_nodes, t7_value);
      t8 = claim_space(p1_nodes);
      a1 = claim_element(p1_nodes, "A", {
        href: true
      });
      var a1_nodes = children(a1);
      t9 = claim_text(a1_nodes, t9_value);
      a1_nodes.forEach(detach_dev);
      p1_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(h1, file, 8, 0, 130);
      attr_dev(a0, "href", a0_href_value = "callto:" +
      /*$_*/
      ctx[0]("footer.phone"));
      add_location(a0, file, 11, 23, 184);
      add_location(p0, file, 11, 0, 161);
      attr_dev(a1, "href", a1_href_value = "mailto:" +
      /*$_*/
      ctx[0]("footer.email") + " ");
      add_location(a1, file, 13, 23, 284);
      add_location(p1, file, 13, 0, 261);
    },
    m: function mount(target, anchor) {
      insert_dev(target, t0, anchor);
      insert_dev(target, h1, anchor);
      append_dev(h1, t1);
      insert_dev(target, t2, anchor);
      insert_dev(target, p0, anchor);
      append_dev(p0, t3);
      append_dev(p0, t4);
      append_dev(p0, a0);
      append_dev(a0, t5);
      insert_dev(target, t6, anchor);
      insert_dev(target, p1, anchor);
      append_dev(p1, t7);
      append_dev(p1, t8);
      append_dev(p1, a1);
      append_dev(a1, t9);
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (dirty &
      /*$_*/
      1 && title_value !== (title_value =
      /*$_*/
      ctx[0]("Contacts.Title"))) {
        document.title = title_value;
      }

      if (dirty &
      /*$_*/
      1 && t1_value !== (t1_value =
      /*$_*/
      ctx[0]("Contacts.H1") + "")) set_data_dev(t1, t1_value);
      if (dirty &
      /*$_*/
      1 && t3_value !== (t3_value =
      /*$_*/
      ctx[0]("Contacts.P1") + "")) set_data_dev(t3, t3_value);
      if (dirty &
      /*$_*/
      1 && t5_value !== (t5_value =
      /*$_*/
      ctx[0]("footer.phoneToAppear") + "")) set_data_dev(t5, t5_value);

      if (dirty &
      /*$_*/
      1 && a0_href_value !== (a0_href_value = "callto:" +
      /*$_*/
      ctx[0]("footer.phone"))) {
        attr_dev(a0, "href", a0_href_value);
      }

      if (dirty &
      /*$_*/
      1 && t7_value !== (t7_value =
      /*$_*/
      ctx[0]("Contacts.P2") + "")) set_data_dev(t7, t7_value);
      if (dirty &
      /*$_*/
      1 && t9_value !== (t9_value =
      /*$_*/
      ctx[0]("footer.email") + "")) set_data_dev(t9, t9_value);

      if (dirty &
      /*$_*/
      1 && a1_href_value !== (a1_href_value = "mailto:" +
      /*$_*/
      ctx[0]("footer.email") + " ")) {
        attr_dev(a1, "href", a1_href_value);
      }
    },
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(t0);
      if (detaching) detach_dev(h1);
      if (detaching) detach_dev(t2);
      if (detaching) detach_dev(p0);
      if (detaching) detach_dev(t6);
      if (detaching) detach_dev(p1);
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
  validate_slots("Contacts", slots, []);
  var writable_props = [];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Contacts> was created with unknown prop '".concat(key, "'"));
  });

  $$self.$capture_state = function () {
    return {
      _: ne,
      $_: $_
    };
  };

  return [$_];
}

var Contacts = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Contacts, _SvelteComponentDev);

  var _super = _createSuper(Contacts);

  function Contacts(options) {
    var _this;

    _classCallCheck(this, Contacts);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Contacts",
      options: options,
      id: create_fragment.name
    });
    return _this;
  }

  return Contacts;
}(SvelteComponentDev);

export default Contacts;
