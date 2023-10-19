import '~/components/Model/model.css'
const plainOptions = ['Muốn đọc', 'Đang đọc', 'Đã đọc'];
const TheSelectShelf = () => {
    const [value1, setValue1] = useState('Muốn đọc');
    const inputRef = useRef(null);
    const [name, setName] = useState('');
    const onChange1 = ({ target: { value } }) => {
        console.log('radio1 checked', value);
        setValue1(value);
    };
    const onNameChange = (event) => {
        setName(event.target.value);
    };
    const addItem = (e) => {
        e.preventDefault();
        setItems([...items, name || `New item ${index++}`]);
        setName('');
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };
    let radioBox = <Radio.Group options={plainOptions} onChange={onChange1} value={value1} />

    let selectionBox = <Select
        style={{
            width: 300,
        }}
        placeholder="custom dropdown render"
        dropdownRender={(menu) => (
            <>
                {menu}
                <Divider
                    style={{
                        margin: '8px 0',
                    }}
                />
                <Space
                    style={{
                        padding: '0 8px 4px',
                    }}
                >
                    <Input
                        placeholder="Please enter item"
                        ref={inputRef}
                        value={name}
                        onChange={onNameChange}
                    />
                    <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                        Add item
                    </Button>
                </Space>
            </>
        )}
        options={items.map((item) => ({
            label: item,
            value: item,
        }))}
    />
    return (
        <>
            {radioBox}
            {selectionBox}
        </>
    )
}
export default TheSelectShelf
