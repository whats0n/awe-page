# **AwePage**

## **init**

```
import AwePage from 'awe-page'

const ap = new AwePage(options)
ap.bus.on('animation:end', (params) => {...})
```

---
## **Options**

|Name|Type|Default value|
|-------|-------|-------|
|containerSelector|string|.bp-container|
|sectionSelector|string|.bp-section|
|speed|number|1000|
|initialIndex|number|0|
|onLoad|function|null|

---

## Methods

### **destroy**
Destroy the AwePage instance with functionality

---

## **Events**

### **animation:start**
#### arguments
```
{
  prev: number,
  current: number
}
```
`prev` - previous section index

`current` - current section index

---

### **animation:end**
#### arguments
```
{
  prev: number,
  current: number
}
```
`prev` - previous section index

`current` - current section index
