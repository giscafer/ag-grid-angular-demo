import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import gql from 'graphql-tag';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export abstract class HackerNewsItem {
    id: string
    time: number
    timeISO: string
    text: string
    dead: Boolean
    url: string
    score: number
    title: string
    descendants: number
    deleted?: Boolean
}


/* graphql service 为：https://github.com/clayallsopp/graphqlhub */

const toStoriesQry = gql`
{
  hn {
    topStories(limit:50){
      id,
      type,
      text,
      url,
      score,
      title,
      timeISO
    }
  }
}
`;

@Injectable()
export class GraphQLService {
    constructor(private apollo: Apollo) {
    }

    qryTopStories(): Observable<HackerNewsItem[]> {
        return this.apollo
            .watchQuery({
                query: toStoriesQry
            })
            .valueChanges.pipe<HackerNewsItem[]>(
                map((result: any) => {
                    return result.data.hn.topStories
                })
            );
    }

}
