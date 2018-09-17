var api_obj={
	name:'xxx',//api的名稱
    add($d,$call_back){
        $.ajax({
            method:'POST',
            url:'/api/'+this.name,
            data:JSON.stringify($d), //格式化成json樣式
            contentType: "application/json; charset=utf-8",
	        dataType: "json"
        }).done($call_back);

    },
	ls($call_back){
		$.get('/api/'+this.name,$call_back);
	},
	rm($id,$call_back){
        $.ajax({
            method:'DELETE',
            url:'/api/'+this.name+'/'+$id

        }).done($call_back);
	}
	
};
var user=Object.assign({},api_obj,{
	name:'users'
});
var ui={
    init(){
        this.tb = $('#tb1');//在取得table id
        this.input_name =$('#name');
        this.init_event();
        this.render_tb();
    },
    init_event(){
        var $self = this;
        //增加2個事件在畫面上 add,del
        this.tb.on('click','.btn_del',($event)=>{
            var $obj = $($event.currentTarget); //到底是誰tmd的觸發我
            var $tr = $obj.parents('tr');//取得觸發者的那一列資料
            var $id = $tr.attr('_id');//取得該列id
            user.rm($id,()=>{
                $self.render_tb();//重新整理
            })
        });
        $('#btn_add').on('click',($event)=>{
            let $d={};
            $d.name = $self.input_name.val();//取得input box 的值
            if($d.name){//如果有值
                user.add($d,()=>{//啟動新增資料api
                    this.render_tb();//結束之後就重新整理資料
                })
            }
        })
    },
    render_tb(){
        user.ls(($data)=>{
            var $tbb=$('#tb1 tbody');//指定是table id=tb1裡面的tbody
            $tbb.html('');//清空
            for(let $d of $data){
                $tbb.append(`<tr _id="${$d.id}" >
                             <td> ${$d.id}</td>
                             <td>${$d.nam}</td>
					        <td><button  class="btn_del">Del</button></td>
                            </tr>`);
            }
        });
    }
    
};
ui.init();