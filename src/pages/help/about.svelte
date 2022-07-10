<script>
  import { Page, Block, Row, Col, Icon, Button } from "framework7-svelte";

  import IndexPage from "../../components/page/indexPage.svelte";
  import { developerContact } from "../../stores/main";
</script>

<Page name="home">
  <IndexPage title="About" heroImg="./static/images/hero-12.svg">
    <span slot="title">
      <div>TENTANG</div>
      <div>LIBRARY INFORMATION SYSTEM</div>
    </span>
    <span slot="content">
      <Block strong>
        <h2>Tentang Aplikasi</h2>
        <p>
          Library Information system adalah aplikasi yang dibangun untuk
          memudahkan pencarian perpustakaan, buku, dan paper yang ada di
          sekitar. Aplikasi ini dibangun pada platform web dan mobile yang bisa
          diakses siapa saja.
        </p>
        <p>
          Aplikasi menggunakan bahasa javascript dengan svelte sebagai library
          component, framework7 sebagai framework dan mapbox sebagai peta.
          Aplikasi Dibuat dengan tujuan sebagai tugas akhir pengembang.
        </p>
      </Block>
      <Block strong>
        <h2>Kontak Pengembang</h2>
        <Row>
          {#each $developerContact as e}
            <Col width="15">
              <a round class="link external" href={e.link}>
                <Icon f7={e.name} color={e.color} />
              </a>
            </Col>
          {/each}
        </Row>
      </Block>
    </span>
  </IndexPage>
</Page>
