<script>
  import {
    List,
    ListInput,
    ListItem,
    Button,
    f7,
    Col,
    Row,
  } from "framework7-svelte";
  import { onMount } from "svelte";
  import { phone } from "../../../stores/phoneDial";
  import { userResult } from "../../../stores/data";
  import { isoToDmy } from "../../../js/util";

  //element variable
  let calendarDateFormat, genderSelect, phoneC;
  //value variable
  let name,
    gender,
    placeOfBirth,
    dateOfBirth,
    address,
    profession,
    institution,
    phoneCode,
    phoneNo,
    isWhatsapp;

  onMount(() => {
    f7.dialog.preloader();
    setTimeout(function () {
      name = $userResult.name;
      gender = $userResult.gender;
      placeOfBirth = $userResult.placeOfBirth;
      dateOfBirth = $userResult.dateOfBirth;
      address = $userResult.address;
      profession = $userResult.profession;
      institution = $userResult.institution;
      phoneCode = "+62";
      phoneNo = $userResult.phoneNo;
      isWhatsapp = $userResult.isWhatsapp;
      f7.dialog.close();
    }, 1500);

    calendarDateFormat = f7.calendar.create({
      inputEl: "#demo-calendar-date-format",
      dateFormat: "dd MM yyyy",
      closeOnSelect: true,
      on: {
        close: function () {
          dateOfBirth = isoToDmy(calendarDateFormat.getValue(), "dd mmmm yyyy");
        },
      },
    });
  });

  const updateProfile = (password) => {
    console.log(password);
    const data = {
      name,
      gender,
      placeOfBirth,
      dateOfBirth,
      address,
      profession,
      institution,
      phoneCode,
      phoneNo,
      isWhatsapp,
    };
    f7.dialog.confirm(
      `
    Name/Gender : <br>${name} / ${gender}<br><br>
    Birth City/Birthday : <br>${placeOfBirth} / ${isoToDmy(
        dateOfBirth,
        "dd mmmm yyyy"
      )}<br><br>
    Address : <br>${address}<br><br>
    Profession / institution : <br>${profession} / ${institution}<br><br>
    PhoneNumber : <br>(${phoneCode}) ${phoneNo} <br> ${
        isWhatsapp ? "this is my whatsapp number" : ""
      }<br>
    `,
      "Save change?",
      function () {
        sendUpdate(password, JSON.stringify(data));
      }
    );
  };

  var handleError = function (err) {
    console.warn(err);
  };

  const sendUpdate = async (password, data) => {
    const myHeaders = new Headers();

    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("account-credential")}`
    );

    myHeaders.append("Account-auth", password);

    const request = new Request(
      `${import.meta.env.VITE_SERVER_ADDRESS}/profile/update/profile`,
      {
        method: "POST",
        headers: myHeaders,
        body: data,
      }
    );
    const response = await fetch(request).catch(handleError);
    const msg = await response.json();
    if (msg.status != 200) {
      f7.dialog.alert(msg.description, "Failed");
    } else {
      f7.dialog.alert(msg.description, "");
    }
  };
</script>

<List>
  <ListInput
    label="Name"
    floatingLabel
    type="text"
    bind:value={name}
    placeholder="Your name"
  />
  <ListItem
    title="Gender"
    smartSelect
    smartSelectParams={{
      openIn: "popover",
      on: {
        close: function () {
          gender = genderSelect.smartSelectInstance().getValue();
        },
      },
    }}
    bind:this={genderSelect}
  >
    <select
      name="gender"
      value={$userResult.gender}
      on:change={() => {
        genderSelect.smartSelectInstance().close();
      }}
    >
      <option value="M">Male</option>
      <option value="F">Female</option>
    </select>
  </ListItem>
  <Row>
    <Col>
      <ListInput
        label="Birth City"
        bind:value={placeOfBirth}
        floatingLabel
        type="text"
        placeholder="Your birth place"
      />
    </Col>
    <Col>
      <ul>
        <li class="item-content item-input ">
          <div class="item-inner">
            <div class="item-title item-label">Birthday</div>
            <div class="item-input-wrap">
              <input
                type="text"
                tooltip="birthday"
                value={$userResult.dateOfBirth
                  ? isoToDmy($userResult.dateOfBirth, "dd mmmm yyyy")
                  : ""}
                placeholder="Birthday"
                readonly="readonly"
                id="demo-calendar-date-format"
              />
            </div>
          </div>
        </li>
      </ul>
    </Col>
  </Row>
  <ListInput
    label="Address"
    bind:value={address}
    type="textarea"
    resizable
    placeholder="Your Address"
  />
  <Row>
    <Col>
      <ListInput
        label="Profession"
        floatingLabel
        bind:value={profession}
        type="text"
        placeholder="Your profession"
      />
    </Col>
    <Col>
      <ListInput
        label="Institution"
        bind:value={institution}
        floatingLabel
        type="text"
        placeholder="Your institution"
      />
    </Col>
  </Row>

  <Row>
    <Col width="30">
      <ListItem
        title="Phone Number"
        smartSelect
        bind:this={phoneC}
        smartSelectParams={{
          openIn: "popup",
          searchbar: true,
          searchbarPlaceholder: "Search country",
          on: {
            close: function () {
              phoneCode = phoneC.smartSelectInstance().getValue();
            },
          },
        }}
      >
        <select
          name="country code"
          value="+62"
          on:change={() => {
            phoneC.smartSelectInstance().close();
          }}
        >
          {#each $phone as p}
            <option value={p["dial_code"]}>{`${p.name}(${p.dial_code})`}</option
            >
          {/each}
        </select>
      </ListItem>
    </Col>
    <Col width="50">
      <ListInput
        floatingLabel
        type="text"
        placeholder="Phone Number"
        bind:value={phoneNo}
      />
    </Col>
    <Col width="20">
      <ListItem
        checkbox
        title="Whatsapp"
        bind:checked={isWhatsapp}
        name="demo-checkbox"
        tooltip="this number is my whatsapp number"
      />
    </Col>
  </Row>
  <ListItem>
    <Button disabled />
    <Button
      fill
      on:click={() => {
        f7.dialog.password("Enter your password", "", (password) => {
          updateProfile(password);
        });
      }}>Save change</Button
    >
  </ListItem>
</List>
