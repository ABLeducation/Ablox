<script>
  import { FormGroup, Input, Label, Button } from "sveltestrap/src";
</script>

<section id="options" class="container">
  <div class="row">
    <div class="col">
      <h4>LED 2 Options</h4>
    </div>
  </div>
  <div class="row">
    <div class="col-5">
      <FormGroup>
        <Label for="led-color">Position</Label>
        <Input type="select" id="led-color">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
          <option>7</option>
          <option>8</option>
          <option>9</option>
        </Input>
      </FormGroup>
    </div>
    <div class="col-5 offset-2">
      <FormGroup>
        <Label for="color">Color</Label>
        <Input type="color" id="color" />
      </FormGroup>
    </div>
  </div>
</section>

<style>
  h4 {
    text-align: center;
  }
  #options {
    position: absolute;
    top: 0;
    width: 100%;
    left: 0;
    height: 150px;
    background-color: #fff;
    z-index: 20;
  }
</style>
