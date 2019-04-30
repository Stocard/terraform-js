resource "local_file" "foo" {
    content     = "foo!"
    filename = "${path.module}/foo.bar"
}

output "output" {
  value = "${local_file.foo.filename}"
}