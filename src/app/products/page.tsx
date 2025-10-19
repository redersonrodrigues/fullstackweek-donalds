import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const ProductPage = () => {
  return (
    <div className="p-5 border border-red-500 rounded-xl">
        <h1 className="text-red-500">Page from Products</h1>
        <p>This is the products page</p>
        <Button>FSW 7.0</Button>
        <Input placeholder="Bora fechar este projeto." />

    </div>
  )
}

export default ProductPage