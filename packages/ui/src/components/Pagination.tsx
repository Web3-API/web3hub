/** @jsxImportSource theme-ui **/
import { Flex } from 'theme-ui'
import Link from 'next/link'

const Pagination = () => {
  return (
    <Flex className="pagination" sx={{ flex: 1, justifyContent: 'center', mt: 5 }}>
      <Link href="#">
        <a>{'<'}</a>
      </Link>
      <ol sx={{ display: 'flex', '*': { mx: 1 } }}>
        <li>
          <Link href="#">
            <a>1</a>
          </Link>
        </li>
        <li>
          <Link href="#">
            <a>2</a>
          </Link>
        </li>
        <li>
          <Link href="#">
            <a>3</a>
          </Link>
        </li>
        <li>...</li>
        <li>
          <Link href="#">
            <a>20</a>
          </Link>
        </li>
        <li>
          <Link href="#">
            <a>21</a>
          </Link>
        </li>
        <li>
          <Link href="#">
            <a>22</a>
          </Link>
        </li>
      </ol>
      <Link href="#">
        <a>{'>'}</a>
      </Link>
    </Flex>
  )
}

export default Pagination
