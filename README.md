# ng2-dropdown-component

# Angular2 - Simple Dropdown Component APP

## Description  
This is an Angular2 component implementing a simple dropdown multiselect component with integrated search and keyboard management.
It is a structured component which makes use of immutability and encapsulation principles.

## Instructions  
```
git clone https://github.com/francofusini/ng2-dropdown-component.git   
npm install  
npm run
```

## Contribute 
Suggestings of better logical organization and performance oriented approaches will be welcomed.
I would also appreciate hints on which would be the best way to control drop visibility and search refresh from keyboard management inside the service.

## Known Issues
- ng2 custom html tag ```"<seach-renderer>"``` actually inhibits input flex management wich would span it on the whole row residual space

## Todo
- [ ] full keyboard management with change detection management to control drop visibility and search refresh
- [ ] dynamic data loading and different search modes (whole loading, remote api call)
- [ ] search remoting, debouncing and optimizations (eg if previous search string leaded to no results was included in the current don't perform search)
- [ ] drop absolute positioning and other improvements
