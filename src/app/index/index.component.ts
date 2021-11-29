import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
    client: HttpClient;

    constructor(private http: HttpClient) {
        this.client = http;
    }

    game_id: string = "";

    ngOnInit(): void {
    }

    async startGame(): Promise<void> {
        if (this.game_id == "") {
            let id = await this.client.get("/api/maze/new").toPromise()
            //new game
        }
        else {
            let game_exists = await this.client.get(`/api/maze/test?game=${this.game_id}`).toPromise();
            if (game_exists) {
                //game exists, join
            }
            else {
                //game doesn't exist, reject
            }
        }
    }
}
