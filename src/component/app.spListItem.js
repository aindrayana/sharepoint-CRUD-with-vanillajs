import { config } from '../../config';

const render = new Promise((resolve, reject) => {
  SP.SOD.executeFunc('sp.js', 'SP.ClientContext',
    function() {
      getAllListItems(function(response) {
        resolve(response);
      })
    }
  );
});

const getAllListItems = (callback) => {
  let listObj = [];
  let clientContext = new SP.ClientContext(config.siteUrl);
  let questionsList = clientContext.get_web().get_lists().getById(new SP.Guid("504f827b-67bc-4094-846c-a606771535b7")); // Questions List

  let camlQuery = new SP.CamlQuery();
  camlQuery.set_viewXml(`
    <View>
       <Query>
          <Where>
              <Geq>
                <FieldRef Name="ID"/>
                <Value Type="Number">1</Value>
              </Geq>
          </Where>
      </Query>
      <RowLimit>1000</RowLimit>     
    </View>
  `);

  let items = questionsList.getItems(camlQuery);
  clientContext.load(items);

  clientContext.executeQueryAsync(() => {
      let enumerator = items.getEnumerator();
      while (enumerator.moveNext()) {
        let props = enumerator.get_current().get_fieldValues();
        listObj.push({
          "spid": props["ID"],
          "id": props["Question_x0020_ID"],
          "question": props["Question"],
          "details": props["Question_x0020_Details"],
          "answers": props["Answers"],
          "notes": props["Internal_x0020_Notes"]
        })
      }
      callback(listObj);
    }
  );
}

export const createListItem = (form) => {
  return new Promise(function(resolve, reject) {
    let clientContext = new SP.ClientContext(config.siteUrl);
    let oList = clientContext.get_web().get_lists().getById(new SP.Guid("504f827b-67bc-4094-846c-a606771535b7"));
        
    let itemCreateInfo = new SP.ListItemCreationInformation();
    let oListItem = oList.addItem(itemCreateInfo);
  
    for (let [key, value] of Object.entries(form)) {
      oListItem.set_item(key, value);
    }
  
    oListItem.update();
    clientContext.load(oListItem);
    clientContext.executeQueryAsync(() => {
      resolve(oListItem.get_id())
    }, () => {
      reject(false);
    });
  });
}

export const updateListItem = (form, id) => {
  return new Promise(function(resolve, reject) {
    let clientContext = new SP.ClientContext(config.siteUrl);
    let oList = clientContext.get_web().get_lists().getById(new SP.Guid("504f827b-67bc-4094-846c-a606771535b7"));
        
    let oListItem = oList.getItemById(id);
    for (let [key, value] of Object.entries(form)) {
      oListItem.set_item(key, value);
    }
  
    oListItem.update();
    clientContext.executeQueryAsync(() => {
      resolve('item updated!');
    }, () => {
      reject(false);
    });
  });

}

export const listItem = {
  init() {
    return render.then((response) => response);
  }
}